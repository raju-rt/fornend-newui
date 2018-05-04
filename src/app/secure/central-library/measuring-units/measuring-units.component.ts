import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measuring-units',
  templateUrl: './measuring-units.component.html',
  styleUrls: ['./measuring-units.component.less'],
  providers: [ApiService]
})
export class MeasuringUnitsComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  records = 10;
  measures_creation: FormGroup;
  existingCodes = [];
  isUnique = false;
  CategoryList = [];
  Isedit = true;
  request = { "mesureCode": null, "mesureName": null, "status": "1" };

  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

  }
  getMeasuringUnitList() {
    this._service.PostService(this.request, '/centrallib/getMeasurements')
      .subscribe(
      data => {
        this.List = data.measureUnitTOs;
        this.List.forEach(element => {
          element.selected = false;
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
    code.selected = !code.selected;
    if (code.selected) {
      this.selectedlist.push(code);
    } else {
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
  ngOnInit() {
    this.measures_creation = this.fb.group({
      'measurement_code': [null, Validators.required],
      'measurement_name': [null, Validators.required],
      'classification': ['', Validators.required],
      'status': [true, Validators.required],

    });
    this.getMeasuringUnitList();
    this.getCategory();
    this.getCodes();
  }
  getCategory() {
    var request = { "status": 1 }
    console.log(this.measures_creation.value);
    this._service.PostService(request, '/centrallib/getprocures')
      .subscribe(
      data => {
        console.log(data);
        this.CategoryList = data.procurementTOs;
      },
      error => {
        console.log(error);
      },
      () => console.log("success")
      )
  }
  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getMeasurementMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  saveMeasure() {
    console.log(this.measures_creation.value);
    let request: any = {};
    if (this.Isedit === true) {

      this.selectedlist[0].code = this.measures_creation.value.measurement_code;
      this.selectedlist[0].name = this.measures_creation.value.measurement_name;
      this.selectedlist[0].procureClassId = this.measures_creation.value.classification;
      this.selectedlist[0].procurementTO = this.CategoryList.filter(it => {
        return it.id == this.measures_creation.value.classification
      })[0];
      this.selectedlist[0].duplicateFlag = false;
      request = { "measureUnitTOs": [this.selectedlist[0]] };
    } else {
      request = {
        "measureUnitTOs": [{
          "code": this.measures_creation.value.measurement_code, "name": this.measures_creation.value.measurement_name, "status": "1",
          "procurementTO": this.CategoryList.filter(it => {
            return it.id == this.measures_creation.value.classification
          })[0], "selected": false, "duplicateFlag": false, "procureClassId": this.measures_creation.value.classification
        }]
      }
    }
    console.log(request);
    this._service.PostService(request, '/centrallib/saveMeasurements')
      .subscribe(
      data => {
        console.log(data);
        this.measures_creation.reset();
        this.router.navigateByUrl('/secure/central/measuring-units');
      }
      )
  }
  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.measures_creation = this.fb.group({
      'measurement_code': [this.selectedlist[0].code, Validators.required],
      'measurement_name': [this.selectedlist[0].name, Validators.required],
      'classification': [this.selectedlist[0].procureClassId, Validators.required],
    });
    $('.modal').modal('show');
  }
  reset() {
    this.request = { "mesureCode": null, "mesureName": null, "status": "1" };
    this.getMeasuringUnitList();
  }
}
