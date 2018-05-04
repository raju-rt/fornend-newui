import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-country-state-provience',
  templateUrl: './country-state-provience.component.html',
  styleUrls: ['./country-state-provience.component.less'],
  providers: [ApiService]
})
export class CountryStateProvienceComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  existingCodes = [];
  isUnique = false;
  Country_creation: FormGroup;
  Isedit = true;
  records = 10;
  request = { "countryCode": null, "countryName": null, "status": 1 }


  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {
    this.Country_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'startdate': [null, Validators.required],
      'enddate': [null, Validators.required]
    });
  }
  getCSPcodes() {
    // let request = { "status": 1 }
    this._service.PostService(this.request, '/common/getSearchCountries')
      .subscribe(
      data => {
        this.List = data.countryTOs;
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
    this.getCSPcodes();
  }
  getCodes() {
    let request = {};
    this._service.PostService(request, "/common/countryCodeMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }

  saveDetails() {
    let request: any =
      { "countryTOs": [{ "code": this.Country_creation.value.code, "name": this.Country_creation.value.name, "status": "1", "startDate": this.Country_creation.value.startdate, "finishDate": this.Country_creation.value.enddate, "selected": false, "provisionTO": { "id": null, "code": null, "name": null, "timeZoneTO": { "id": null, "code": null, "name": null } }, "currencyTO": { "id": null, "code": null, "name": null }, "duplicateFlag": false }] }
    console.log(this.Country_creation.value);
    if (this.Isedit === true) {
      request = this.selectedlist[0];
      request.code = this.Country_creation.value.code;
      request.name = this.Country_creation.value.name;
      request.startDate = this.Country_creation.value.startdate;
      request.finishDate = this.Country_creation.value.enddate;
    }
    this._service.PostService(request, '/common/saveCountries')
      .subscribe(
      data => {
        console.log(data);
        this.Country_creation.reset();
        this.List = data.countryTOs;
        $('.modal').modal('hide');
      }
      )
  }
  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.Country_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
      'startdate': [this.selectedlist[0].startDate, Validators.required],
      'enddate': [this.selectedlist[0].finishDate, Validators.required]
    });
    $('.modal').modal('show');
  }
  reset() {
    this.request = { "countryCode": null, "countryName": null, "status": 1 };
    this.getCSPcodes();

  }
}
