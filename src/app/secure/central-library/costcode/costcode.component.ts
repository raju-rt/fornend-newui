import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-costcode',
  templateUrl: './costcode.component.html',
  styleUrls: ['./costcode.component.less'],
  providers: [ApiService]
})
export class CostcodeComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = ''
  cc_creation: FormGroup;
  existingCodes = [];
  isUnique;
  records = 10;
  Isedit = true;
  request = { "costCodeCode": null, "costCodeName": null, "status": "1" };
 
  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {



    this.cc_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required]
    });
  }


  getCOClassification() {
    this._service.PostService(this.request, '/centrallib/getCostCodes')
      .subscribe(
      data => {
        this.List = data.costCodeTOs;
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



  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }


  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getCostCodeClassMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  saveDetails() {
    console.log(this.cc_creation.value);

    let request: any = {
      "costCodeTOs": [
        { "code": this.cc_creation.value.code, "name": this.cc_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false }
      ]
    }
    if (this.Isedit === true) {
      request = this.selectedlist[0];
      request.code = this.cc_creation.value.code;
      request.name = this.cc_creation.value.name;
    }
    console.log(request);
    this._service.PostService(request, '/centrallib/saveCostCodes')
      .subscribe(
      data => {
        console.log(data);
        this.cc_creation.reset();
      }
      )
  }
  ngOnInit() {
    this.getCodes();
    this.getCOClassification();
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.cc_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required]
    });
    $('.modal').modal('show');
  }
  reset(){
   this.request = { "costCodeCode": null, "costCodeName": null, "status": "1" };
    this.getCOClassification();
  }
}
