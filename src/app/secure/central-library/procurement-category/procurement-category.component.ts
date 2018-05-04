import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-procurement-category',
  templateUrl: './procurement-category.component.html',
  styleUrls: ['./procurement-category.component.less'],
  providers: [ApiService]

})
export class ProcurementCategoryComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  procur_creation: FormGroup;
  existingCodes = [];
  isUnique;
  pCategory;
  records = 10;
  Isedit = false;
  request = { "procureId": '', "subProcureName": null, "status": "1" }

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {


    this.procur_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'category': [null, Validators.required],
      'procureId': [null, Validators.nullValidator]
    });

  }
  getProcurmentClassification() {
    this._service.PostService(this.request, '/centrallib/getProcureCatgs')
      .subscribe(
      data => {
        this.List = data.procureMentCatgTOs;
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
    this.getProcurmentClassification();
    this.getCodes();
    this.getProcures();
  }


  getProcures() {
    let request = { "status": 1, "procureClassId": 2 }
    this._service.PostService(request, '/centrallib/getprocures')
      .subscribe(
      data => {
        console.log(data)
        this.pCategory = data.procurementTOs
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }




  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }


  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getProcureCatgClassMap")
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
      this.selectedlist[0].code = this.procur_creation.value.code;
      this.selectedlist[0].desc = this.procur_creation.value.name;
      this.selectedlist[0].procurement = this.procur_creation.value.category;
      request = { "procureMentCatgTOs": [this.selectedlist[0]] }
    }
    else {

      request = {
        "procureMentCatgTOs": [
          {
            "code": this.procur_creation.value.code, "desc": this.procur_creation.value.name, "status": "1", "selected": false,
            "procurement": this.procur_creation.value.category, "procureId": this.procur_creation.value.category.procureId, "duplicateFlag": false
          }]
      }
      console.log(this.procur_creation.value);
      console.log(request);
      this._service.PostService(request, 'centrallib/saveProcureCatgs')
        .subscribe(
        data => {
          this.List = data.procureMentCatgTOs;
          this.List.forEach(element => {
            element.checked = false;
          });
          console.log(data);
          this.procur_creation.reset();
          $('#plantclasification').modal('hide');
        }
        )
    }
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.procur_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].desc, Validators.required],
      'category': [this.selectedlist[0].procurement, Validators.required],
      'procureId': [this.selectedlist[0].procureId, Validators.required],
    });
    $('#procu-create').modal('show');
  }
  reset() {
    this.request = { "procureId": null, "subProcureName": null, "status": "1" }
    this.getProcurmentClassification();
  }

}