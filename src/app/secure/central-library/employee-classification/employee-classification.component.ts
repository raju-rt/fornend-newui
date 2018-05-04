import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-classification',
  templateUrl: './employee-classification.component.html',
  styleUrls: ['./employee-classification.component.less'],
  providers: [ApiService]
})
export class EmployeeClassificationComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = ''
  records = 10;
  Employee_creation: FormGroup;
  measuresList = [];
  existingCodes = [];
  isUnique;
  Isedit = false;
  request = { "empCode": null, "empName": null, "status": "1" };
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.Employee_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'measureUnitTO': ['', Validators.required]
    });

  }
  getEmployeeClassification() {
    this._service.PostService(this.request, '/centrallib/getEmpClasses')
      .subscribe(
      data => {
        this.List = data.empClassTOs;
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
    this.getEmployeeClassification();
    this.getCodes();
    this.getMeasures();
  }
  saveDetails() {
    let request
    if (this.Isedit) {
      this.selectedlist[0].code = this.Employee_creation.value.code;
      this.selectedlist[0].name = this.Employee_creation.value.name;
      this.selectedlist[0].measureId = parseInt(this.Employee_creation.value.measureUnitTO)
      this.selectedlist[0].measureUnitTO = this.measuresList.filter(it => {
        return it.id == this.Employee_creation.value.measureUnitTO
      })[0],
        request = { "empClassTOs": [this.selectedlist[0]] }
    } else {
      request = {
        "empClassTOs": [{
          "code": this.Employee_creation.value.code, "name": this.Employee_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false, "measureUnitTO":
            this.measuresList.filter(it => {
              return it.id == this.Employee_creation.value.measureUnitTO
            })[0], "measureId": parseInt(this.Employee_creation.value.measureUnitTO)
        }]
      }

    }

    console.log(this.Employee_creation.value);
    this._service.PostService(request, '/centrallib/saveEmpClasses')
      .subscribe(
      data => {
        console.log(data);
        this.Employee_creation.reset();
        this.List = data.empClassTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        $('#empclasification').modal('hide');

        // this.router.navigateByUrl('/secure/central/employee-classification');
      }
      )
  }
  getMeasures() {
    let request = { "status": 1, "procureClassId": 1 };
    // 
    this._service.PostService(request, "/centrallib/getMeasuresByProcureType")
      .subscribe(data => {
        this.measuresList = data.measureUnitTOs;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  getMval(measure) {
    return JSON.stringify(measure)
  }
  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getEmpClassMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.Employee_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
      'measureUnitTO': [this.selectedlist[0].measureId, Validators.required],
    });
    $('#empclasification').modal('show');
  }
  reset(){
  this.request = { "empCode": null, "empName": null, "status": "1" };
  this.getEmployeeClassification();
  }
}
