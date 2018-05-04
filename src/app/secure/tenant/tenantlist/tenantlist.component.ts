import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
@Component({
  selector: 'app-tenantlist',
  templateUrl: './tenantlist.component.html',
  styleUrls: ['./tenantlist.component.less'],
  providers: [ApiService]

})
export class TenantlistComponent implements OnInit {

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
  };
  togggled: any = false;
  tenantList: any;
  records = 10;
  tenantForm: FormGroup;
  selectedlist: any = [];
  isedit = false;
  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {

  }
  getTenantList() {
    // var request = { "cmpCode ": null, "cmpName ": null, "status": "1" };
    // this._service.PostService(request, '/user/getUsers')
    var request = { "status": "1" };
    this._service.PostService(request, '/user/getClients')
      .subscribe(
      data => {
        // this.tenantList = data.users;
        this.tenantList = data.clientRegTOs;
        this.tenantList.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  viewTenant(tenant) {
    // $('#tanantInfo').modal('show');
    // this._route.navigateByUrl('/secure/tenant/edit', this.tenantDetails)
  }

  ngOnInit() {
    this.tenantForm = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'dispName': [null, Validators.required],
      'userName': [null, Validators.required],
      'password': [null, Validators.required],
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'businessType': [null, Validators.required],
      'email': [null, Validators.required],
      'fax': [null, Validators.required],
      'mobile': [null, Validators.required],
      'phone': [null, Validators.required],
      'remarks': [null, Validators.required],
      'maxRegUsers': [null, Validators.compose([Validators.nullValidator])],
      'maxActiveUsers': [null, Validators.required],
      'maxEPSLevel': [null, Validators.required],
      'maxLoginAttempts': [null, Validators.required],
      'mailTemplate': [null, Validators.compose([Validators.nullValidator])],
      'country': [null, Validators.required],
      'webSiteURL': [null, Validators.required],
      'creditCardDetails': [null, Validators.compose([Validators.nullValidator])],
      'registeredUsers': [null, Validators.required],
      'licence': [null, Validators.required],
      'contactPerson': [null, Validators.required],
      'address': [null, Validators.required],
    });
    this.getTenantList();
  }
  createTenant() {
    $("#tenantmdl").modal('show');
  }
  saveDetails() {
    let requestData: any;
    if (!this.isedit) {
      requestData = {
        "clientRegTO":
          {
            "userTO":
              {
                "firstName": this.tenantForm.value.firstName,
                "lastName": this.tenantForm.value.lastName,
                "dispName": this.tenantForm.value.dispName,
                "userName": this.tenantForm.value.userName,
                "password": this.tenantForm.value.password,
                "status": 1
              }, "code": this.tenantForm.value.code,
            "name": this.tenantForm.value.name,
            "businessType": this.tenantForm.value.businessType,
            "email": this.tenantForm.value.email,
            "fax": this.tenantForm.value.fax,
            "mobile": this.tenantForm.value.mobile,
            "phone": this.tenantForm.value.phone,
            "saveFlag": true,
            "remarks": this.tenantForm.value.remarks,
            "maxRegUsers": this.tenantForm.value.maxRegUsers,
            "maxActiveUsers": this.tenantForm.value.maxActiveUsers,
            "maxEPSLevel": this.tenantForm.value.maxEPSLevel,
            "maxLoginAttempts": this.tenantForm.value.maxLoginAttempts,
            "mailTemplate": this.tenantForm.value.mailTemplate, "status": 1,
            "country": this.tenantForm.value.country,
            "webSiteURL": this.tenantForm.value.webSiteURL,
            "creditCardDetails": this.tenantForm.value.creditCardDetails,
            "registeredUsers": this.tenantForm.value.registeredUsers,
            "licence": this.tenantForm.value.licence,
            "contactPerson": this.tenantForm.value.contactPerson,
            "address": this.tenantForm.value.address
          }
      };
    } else {
      requestData = { "clientRegTO": this.selectedlist[0] };
      requestData.clientRegTO.userTO.firstName = this.tenantForm.value.firstName;
      requestData.clientRegTO.userTO.lastName = this.tenantForm.value.lastName;
      requestData.clientRegTO.userTO.dispName = this.tenantForm.value.dispName;
      requestData.clientRegTO.userTO.userName = this.tenantForm.value.userName;
      requestData.clientRegTO.userTO.password = this.tenantForm.value.password;
      requestData.clientRegTO.code = this.tenantForm.value.code;
      requestData.clientRegTO.name = this.tenantForm.value.name;
      requestData.clientRegTO.businessType = this.tenantForm.value.businessType;
      requestData.clientRegTO.email = this.tenantForm.value.email;
      requestData.clientRegTO.fax = this.tenantForm.value.fax;
      requestData.clientRegTO.mobile = this.tenantForm.value.mobile;
      requestData.clientRegTO.phone = this.tenantForm.value.phone;
      requestData.clientRegTO.remarks = this.tenantForm.value.remarks;
      requestData.clientRegTO.maxRegUsers = this.tenantForm.value.maxRegUsers;
      requestData.clientRegTO.maxActiveUsers = this.tenantForm.value.maxActiveUsers;
      requestData.clientRegTO.maxEPSLevel = this.tenantForm.value.maxEPSLevel;
      requestData.clientRegTO.maxLoginAttempts = this.tenantForm.value.maxLoginAttempts;
      requestData.clientRegTO.mailTemplate = this.tenantForm.value.mailTemplate;
      requestData.clientRegTO.country = this.tenantForm.value.country;
      requestData.clientRegTO.webSiteURL = this.tenantForm.value.webSiteURL;
      requestData.clientRegTO.creditCardDetails = this.tenantForm.value.creditCardDetails;
      requestData.clientRegTO.registeredUsers = this.tenantForm.value.registeredUsers;
      requestData.clientRegTO.licence = this.tenantForm.value.licence;
      requestData.clientRegTO.contactPerson = this.tenantForm.value.contactPerson;
      requestData.clientRegTO.address = this.tenantForm.value.address;
    }

    if (typeof requestData.clientRegTO.licence === "object") {
      requestData.clientRegTO.licence = requestData.clientRegTO.licence.formatted;
    }
    this._service.PostService(requestData, '/user/saveClient')
      .subscribe(data => {
        console.log(data);
        $("#tenantmdl").modal('hide');
      },
      error => {
        console.log(error);
      })
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
  edit() {
    let d = new Date(this.selectedlist[0].licence);
    this.tenantForm = this.fb.group({
      'firstName': [this.selectedlist[0].userTO.firstName, Validators.required],
      'lastName': [this.selectedlist[0].userTO.lastName, Validators.required],
      'dispName': [this.selectedlist[0].userTO.dispName, Validators.required],
      'userName': [this.selectedlist[0].userTO.userName, Validators.required],
      'password': [null, Validators.required],
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
      'businessType': [this.selectedlist[0].businessType, Validators.required],
      'email': [this.selectedlist[0].email, Validators.required],
      'fax': [this.selectedlist[0].fax, Validators.required],
      'mobile': [this.selectedlist[0].mobile, Validators.required],
      'phone': [this.selectedlist[0].phone, Validators.required],
      'remarks': [this.selectedlist[0].remarks, Validators.required],
      'maxRegUsers': [this.selectedlist[0].maxRegUsers, Validators.compose([Validators.nullValidator])],
      'maxActiveUsers': [this.selectedlist[0].maxActiveUsers, Validators.required],
      'maxEPSLevel': [this.selectedlist[0].maxEPSLevel, Validators.required],
      'maxLoginAttempts': [this.selectedlist[0].maxLoginAttempts, Validators.required],
      'mailTemplate': [this.selectedlist[0].mailTemplate, Validators.compose([Validators.nullValidator])],
      'country': [this.selectedlist[0].country, Validators.required],
      'webSiteURL': [this.selectedlist[0].webSiteURL, Validators.required],
      'creditCardDetails': [this.selectedlist[0].creditCardDetails, Validators.compose([Validators.nullValidator])],
      'registeredUsers': [this.selectedlist[0].registeredUsers, Validators.required],
      'licence': [{ date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } }, Validators.required],
      'contactPerson': [this.selectedlist[0].contactPerson, Validators.required],
      'address': [this.selectedlist[0].address, Validators.required],
    });
    $("#tenantmdl").modal('show');
    this.isedit = true;
  }
}

