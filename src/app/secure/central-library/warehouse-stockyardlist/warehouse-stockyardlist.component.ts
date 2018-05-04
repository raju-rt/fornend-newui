import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-warehouse-stockyardlist',
  templateUrl: './warehouse-stockyardlist.component.html',
  styleUrls: ['./warehouse-stockyardlist.component.less'],
  providers: [ApiService]

})
export class WarehouseStockyardlistComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  warehouse_creation: FormGroup;
  existingCodes = [];
  isUnique;
  sCategory;
  records = 10;
  Isedit = false;
  request = { "stockCode": null, "stackName": null, "status": "1" }

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {


    this.warehouse_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'category': [null, Validators.required]
    });
  }
  getServiceClassification() {
    this._service.PostService(this.request, '/centrallib/getStocks')
      .subscribe(
      data => {
        this.List = data.stockAndStoreTOs;
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
    this.getServiceClassification();
    this.getCodes();
    this.getStockCategory();
  }


  getStockCategory() {
    let request = { "status": 1 }
    this._service.PostService(request, '/centrallib/stockCategoryOnLoad')
      .subscribe(
      data => {
        console.log(data)
        this.sCategory = data.categorys;
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
    this._service.PostService(request, "/centrallib/getWareHouseMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }






  saveDetails() {
    let request;
    if (this.Isedit) {
      this.selectedlist[0].code = this.warehouse_creation.value.code;
      this.selectedlist[0].desc = this.warehouse_creation.value.name;
      this.selectedlist[0].category = this.warehouse_creation.value.category;
      request = { "stockAndStoreTOs": [this.selectedlist[0]] }
    } else {
      request = {
        "stockAndStoreTOs": [
          {
            "code": this.warehouse_creation.value.code, "desc": this.warehouse_creation.value.name,
            "category": this.warehouse_creation.value.category, "status": 1, "selected": false, "duplicateFlag": false
          }]
      }

    }
    console.log(this.warehouse_creation.value);
    console.log(request);
    this._service.PostService(request, '/centrallib/saveStocks')
      .subscribe(
      data => {
        this.List = data.stockAndStoreTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        console.log(data);
        this.warehouse_creation.reset();
        $('#warehouse-create').modal('hide');

      }
      )
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.warehouse_creation = this.fb.group({

      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].desc, Validators.required],
      'category': [this.selectedlist[0].category, Validators.required],
    });
    $('#warehouse-create').modal('show');
  }
  reset() {
    this.request = { "stockCode": null, "stackName": null, "status": "1" };
    this.getServiceClassification();
  }
}