import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-emp-wage',
  templateUrl: './emp-wage.component.html',
  styleUrls: ['./emp-wage.component.less'],
  providers: [ApiService]

})
export class EmpWageComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  emp_wages_creation: FormGroup;
  existingCodes = [];
  isUnique;
  records = 10;
  Isedit = false;
  request = { "empWageCode": null, "empWageName": null, "status": "1" }

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {


    this.emp_wages_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'factor': [null, Validators.required]
    });

  }
  getEWRFlassification() {
    this._service.PostService(this.request, '/centrallib/getEmpWages')
      .subscribe(
      data => {
        this.List = data.employeeWageRateTOs;
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
    this.getEWRFlassification();
  }



  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }


  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getEmpWageFactorMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }

  saveDetails() {
    let request
    if (this.Isedit) {
      this.selectedlist[0].code = this.emp_wages_creation.value.code;
      this.selectedlist[0].name = this.emp_wages_creation.value.name;
      this.selectedlist[0].wageFactor = this.emp_wages_creation.value.factor;
      request = {
        "employeeWageRateTOs": [this.selectedlist[0]]
      };
    } else {
      request = {
        "employeeWageRateTOs": [
          { "code": this.emp_wages_creation.value.code, "name": this.emp_wages_creation.value.name, "wageFactor": this.emp_wages_creation.value.factor, "status": 1, "selected": false, "duplicateFlag": false }
        ]
      }
    }
    console.log(this.emp_wages_creation.value);
    console.log(request);
    this._service.PostService(request, '/centrallib/saveEmpWages')
      .subscribe(
      data => {
        this.List = data.employeeWageRateTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        $('#emp-wages-create').modal('hide');
        console.log(data);
        this.emp_wages_creation.reset();
      })
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.emp_wages_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
      'factor': [this.selectedlist[0].wageFactor, Validators.required],
    });
    $('#emp-wages-create').modal('show');
  }
  reset() {
    this.request = { "empWageCode": null, "empWageName": null, "status": "1" };
    this.getEWRFlassification();
  }
}

