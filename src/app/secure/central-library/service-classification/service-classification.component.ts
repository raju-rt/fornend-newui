import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-service-classification',
  templateUrl: './service-classification.component.html',
  styleUrls: ['./service-classification.component.less'],
  providers: [ApiService]

})
export class ServiceClassificationComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  service_creation: FormGroup;
  existingCodes = [];
  isUnique;
  records = 10;
  Isedit = false;
  request = { "serviceCode": null, "serviceName": null, "status": "1" }

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {


    this.service_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required]
    });

  }
  getServiceClassification() {
    this._service.PostService(this.request, '/centrallib/getServiceClasses')
      .subscribe(
      data => {
        this.List = data.serviceClassTOs;
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
    this.getServiceClassification();
  }




  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }


  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getServiceClassMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }

  saveDetails() {

    console.log(this.service_creation.value);

    let request;
    if (this.Isedit) {
      request = this.selectedlist[0];
      request.code = this.service_creation.value.code;
      request.name = this.service_creation.value.name;
      request = { "serviceClassTOs": [this.selectedlist[0]] }

    } else {
      request = {
        "serviceClassTOs": [
          { "code": this.service_creation.value.code, "name": this.service_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false }
        ]
      }
    }

    console.log(request);
    this._service.PostService(request, '/centrallib/saveServiceClasses')
      .subscribe(
      data => {
        this.List = data.serviceClassTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        console.log(data);
        this.service_creation.reset();
        this.selectedlist = [];
        $('#service-create').modal('hide');

      }
      )
  }
  edit() {
    this.getCodes();
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.service_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
    });
    $('#service-create').modal('show');
  }
  reset() {
    this.request = { "serviceCode": null, "serviceName": null, "status": "1" };
    this.getServiceClassification();
  }

}

