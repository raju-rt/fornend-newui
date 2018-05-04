import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';

@Component({

  selector: 'app-plant-classification',
  templateUrl: './plant-classification.component.html',
  styleUrls: ['./plant-classification.component.less'],
  providers: [ApiService]
})
export class PlantClassificationComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  records = 10;
  plant_creation: FormGroup;
  mUnits;
  existingCodes = [];
  isUnique;
  Isedit = false;
  request = { "plantCode": null, "plantName": null, "status": "1" }
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.plant_creation = this.fb.group({
      'plant_code': [null, Validators.required],
      'plant_name': [null, Validators.required],
      'units_of_meas': ['', Validators.required],
      // 'status': [true, Validators.required],

    });

  }
  getPlantClassification() {
    this._service.PostService(this.request, '/centrallib/getPlantClasses')
      .subscribe(
      data => {
        this.List = data.plantClassTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  viewRecord(record) {
    record = JSON.stringify(record);
    alert(record);
  }

  selectedRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedlist.push(code);
    } else {
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
  ngOnInit() {
    this.getCodes();
    this.getPlantMeasUnits();
    this.getPlantClassification();
  }

  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }


  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getPlantClassMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  getPlantMeasUnits() {
    let request = { "status": 1, "procureClassId": 2 }
    this._service.PostService(request, '/centrallib/getMeasuresByProcureType')
      .subscribe(
      data => {
        console.log(data)
        this.mUnits = data.measureUnitTOs
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  savePlant() {
    let request
    if (this.Isedit) {
      this.selectedlist[0].code = this.plant_creation.value.plant_code;
      this.selectedlist[0].name = this.plant_creation.value.plant_name;
      this.selectedlist[0].measureUnitTO = this.mUnits.filter((e) => {
        return e.id == this.plant_creation.value.units_of_meas
      })[0];
      this.selectedlist[0].measureId = this.plant_creation.value.units_of_meas;
      request = { "plantClassTOs": [this.selectedlist[0]] }
    }
    else {
      request = {
        "plantClassTOs": [
          {
            "code": this.plant_creation.value.plant_code, "name": this.plant_creation.value.plant_code, "measureUnitTO.name": "", "status": 1, "selected": false, "duplicateFlag": false,
            "measureUnitTO": this.mUnits.filter((e) => {
              return e.id == this.plant_creation.value.units_of_meas
            })[0], "measureId": this.plant_creation.value.units_of_meas
          }
        ]
      }
    }
    console.log(this.plant_creation.value);
    console.log(request);
    this._service.PostService(request, '/centrallib/savePlantClasses')
      .subscribe(
      data => {
        console.log(data);
        this.plant_creation.reset();
        this.List = data.plantClassTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        this.selectedlist = [];
        this.Isedit = false;
        $('#plantclasification').modal('hide');
        // this.router.navigateByUrl('/secure/central/employee-classification');
      }
      )
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.plant_creation = this.fb.group({
      'plant_code': [this.selectedlist[0].code, Validators.required],
      'plant_name': [this.selectedlist[0].name, Validators.required],
      'units_of_meas': [this.selectedlist[0].measureId, Validators.required],
    });
    $('#plantclasification').modal('show');
  }
  reset(){
 this.request = { "plantCode": null, "plantName": null, "status": "1" }
  this.getPlantClassification();
  }
}
