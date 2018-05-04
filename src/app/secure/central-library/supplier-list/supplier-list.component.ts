import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.less'],
  providers: [ApiService]
})
export class SupplierListComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
  };
  togggled: any = false;
  List: any;
  selectedlist = [];
  records = 10;
  selectedRecord: any = { addressList: [], contacts: [], currentProjs: [], closedProjs: [] };
  selectedAddress: any = [];
  selectedContact: any = [];
  selectedCurproj: any = [];
  company_list_creation: FormGroup;
  address_creation: FormGroup;
  contact_creation: FormGroup;
  project_creation: FormGroup;
  projects = [];
  request = { "cmpCode ": null, "cmpName ": null, "status": "1" };
  existingCodes = [];
  supplierdata: any = { businessCatgResp: {}, companyCatgResp: {} };
  isUnique = { status: false, values: [false, false, false] };
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router, private location: Location) {
    this.getList();
  }
  getList() {
    this._service.PostService(this.request, '/centrallib/getCompanies')
      .subscribe(
      data => {
        this.List = data.companyTOs;
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
      var index = this.selectedlist.map(function (e) { return e.cmpCode; }).indexOf(code.cmpCode);
      this.selectedlist.splice(index, 1)
    }
    if (this.selectedlist.length === 1) {
      this.getCompanyDetails(this.selectedlist[0].id);
    } else {
      this.selectedRecord = { addressList: [], contacts: [], currentProjs: [], closedProjs: [] }
    }
  }
  selectedaddressRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedAddress.push(code);
    } else {
      var index = this.selectedAddress.map(function (e) { return e.addressId; }).indexOf(code.addressId);
      this.selectedAddress.splice(index, 1)
    }

  }
  selectedcontactRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedContact.push(code);
    } else {
      var index = this.selectedContact.map(function (e) { return e.contactId; }).indexOf(code.contactId);
      this.selectedContact.splice(index, 1)
    }

  }
  selectedCurProjRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedCurproj.push(code);
    } else {
      var index = this.selectedContact.map(function (e) { return e.id; }).indexOf(code.id);
      this.selectedCurproj.splice(index, 1)
    }

  }
  getCompanyDetails(id) {
    const req = { "cmpId": id, "status": "1" };
    this._service.PostService(req, '/centrallib/getCompanyDetails')
      .subscribe(data => {
        this.selectedRecord = data.companyTOs[0];
      }, error => console.log(error))
  }
  ngOnInit() {
    this.company_list_creation = this.fb.group({
      'cmpCode': [null, Validators.required],
      'cmpName': [null, Validators.required],
      'status': [1, Validators.nullValidator],
      'cmpActivity': [null, Validators.required],
      'businessCategoryTO': ['', Validators.required],
      'regNo': [null, Validators.required],
      'taxFileNo': [null, Validators.required],
      'companyCatagoryTO': ['', Validators.nullValidator],
      'catgId': [null, Validators.required],
      'duplicateFlag': [false, Validators.required],
      'selected': [false, Validators.required],

    });
    this.address_creation = this.fb.group({
      'companyId': [null, Validators.nullValidator],
      'address': [null, Validators.required],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'pincode': ['', [Validators.required, FormsValidationService.numberOnly, Validators.minLength(6), Validators.maxLength(6)]],
      'status': [1, Validators.required],
      'selected': [false, Validators.required],
    });
    this.contact_creation = this.fb.group({
      'companyId': [null, Validators.nullValidator],
      'contactName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'designation': [null, Validators.required],
      'mobile': [null, [Validators.required, FormsValidationService.numberOnly, Validators.minLength(10), Validators.maxLength(10)]],
      'phone': ['', [Validators.required, FormsValidationService.numberOnly, Validators.minLength(10), Validators.maxLength(10)]],
      'fax': ['', [Validators.required, FormsValidationService.numberOnly, Validators.maxLength(10)]],
      'status': [1, Validators.required],
      'selected': [false, Validators.required],
    });
    this.project_creation = this.fb.group({
      'cmpId': [null, Validators.nullValidator],
      'projCode': [null, Validators.nullValidator],
      'projName': [null, Validators.nullValidator],
      'contractValue': [null, Validators.required],
      'startDate': [1, Validators.required],
      'finishDate': [1, Validators.required],
      'performance': [1, Validators.required],
      'projId': [1, Validators.required],
      'status': [1, Validators.required],
      'selected': [false, Validators.required],
    });
  }
  getFromdata() {
    this._service.PostService({ "status": 1 }, '/centrallib/onLoadDataForCompany')
      .subscribe(data => {
        this.supplierdata = data;
      }, error => console.log(error))
  }
  getsupplierexisting() {
    this._service.PostService({}, '/centrallib/getCompanyMap')
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      }, error => console.log(error))
  }
  SupplierVE(i) {
    this.getFromdata();
    this.getsupplierexisting();
    if (i) {
      this.company_list_creation = this.fb.group({
        'cmpCode': [this.selectedRecord.cmpCode, Validators.required],
        'cmpName': [this.selectedRecord.cmpName, Validators.required],
        'status': [1, Validators.nullValidator],
        'cmpActivity': [this.selectedRecord.cmpActivity, Validators.required],
        'businessCategoryTO': [this.selectedRecord.businessCategoryTO.id, Validators.required],
        'regNo': [this.selectedRecord.regNo, Validators.required],
        'taxFileNo': [this.selectedRecord.taxFileNo, Validators.required],
        'companyCatagoryTO': ['', Validators.nullValidator],
        'catgId': [this.selectedRecord.catgId, Validators.required],
        'duplicateFlag': [false, Validators.required],
        'selected': [false, Validators.required],

      });
      $('#tanantInfo').modal('show');
    } else {
      $('#tanantInfo').modal('show');
    }
  }
  saveTenent() {
    this.company_list_creation.value.status = 1;
    this.company_list_creation.value.businessCategoryTO = this.supplierdata.businessCatgResp.businessCatagoryTOs.filter(elm => {
      return elm.id == this.company_list_creation.value.businessCategoryTO;
    })[0];
    this.company_list_creation.value.companyCatagoryTO = this.supplierdata.companyCatgResp.companyCatagoryTOs.filter(elm => {
      return elm.id == this.company_list_creation.value.catgId;
    })[0];
    console.log(this.company_list_creation.value);
    this._service.PostService({ companyTOs: [this.company_list_creation.value] }, '/centrallib/saveCompany')
      .subscribe(
      data => {
        console.log(data);
        this.List = data.companyTOs;
        this.company_list_creation.reset();
        $('#tanantInfo').modal('hide');
        alert('saved');
      }
      )
  }
  deleteTenant() {
    let req = { "companyIds": [], "status": 2 };
    this.selectedlist.forEach(sel => {
      req.companyIds.push(sel.id);
    })
    this._service.PostService(req, '/centrallib/deleteCompanies')
      .subscribe(
      data => {
        console.log(data);
        this.List = data.companyTOs;
        this.selectedAddress = [];
        this.selectedlist = [];
        this.selectedRecord = { addressList: [], contacts: [], currentProjs: [], closedProjs: [] }
      }
      )
  }
  reset() {
    this.request = { "cmpCode ": null, "cmpName ": null, "status": "1" };
    this.getList();
  }
  saveAddress() {
    this.address_creation.value.companyId = this.selectedRecord.id;
    const req = { addressTOs: [this.address_creation.value], companyId: this.selectedRecord.id }
    this._service.PostService(req, '/centrallib/saveAddress')
      .subscribe(data => {
        this.selectedAddress = [];
        this.selectedRecord.addressList = data.addressTOs;
        this.back();

      }, error => {
        console.log(error);
      })
  }
  deleteAddress() {
    const req = { "addressIds": [], "status": 2 };
    this.selectedAddress.forEach(elm => {
      req.addressIds.push(elm.addressId)
    });
    this._service.PostService(req, '/centrallib/deleteAddress')
      .subscribe(data => {
        this.selectedAddress = [];
        this.getCompanyDetails(this.selectedlist[0].id);
        this.back();

      }, error => {
        console.log(error);
      })
  }
  editAddress() {
    this.address_creation = this.fb.group({
      'companyId': [null, Validators.nullValidator],
      'address': [this.selectedAddress[0].address, Validators.required],
      'city': [this.selectedAddress[0].city, Validators.required],
      'state': [this.selectedAddress[0].state, Validators.required],
      'pincode': [this.selectedAddress[0].pincode, [Validators.required, FormsValidationService.numberOnly, Validators.minLength(6), Validators.maxLength(6)]],
      'status': [1, Validators.required],
      'selected': [false, Validators.required],
      'addressId': [this.selectedAddress[0].addressId, Validators.nullValidator]
    });
    $('#addressinfo').modal('show');
  }
  saveContact() {
    this.contact_creation.value.companyId = this.selectedRecord.id;
    const req = { contactsTOs: [this.contact_creation.value], companyId: this.selectedRecord.id }
    this._service.PostService(req, '/centrallib/saveContacts')
      .subscribe(data => {
        this.selectedAddress = [];
        this.selectedRecord.contacts = data.contactsTOs;
        this.back();

      }, error => {
        console.log(error);
      })
  }
  deleteContact() {
    const req = { "contactIds": [], "status": 2 };
    this.selectedContact.forEach(elm => {
      req.contactIds.push(elm.contactId)
    });
    this._service.PostService(req, '/centrallib/deleteContacts')
      .subscribe(data => {
        this.selectedContact = [];
        this.getCompanyDetails(this.selectedlist[0].id);
        this.back();

      }, error => {
        console.log(error);
      })
  }
  editContact() {
    this.contact_creation = this.fb.group({
      'companyId': [null, Validators.nullValidator],
      'contactName': [this.selectedContact[0].contactName, Validators.required],
      'email': [this.selectedContact[0].email, [Validators.required, Validators.email]],
      'designation': [this.selectedContact[0].designation, Validators.required],
      'mobile': [this.selectedContact[0].mobile, [Validators.required, FormsValidationService.numberOnly, Validators.minLength(10), Validators.maxLength(10)]],
      'phone': [this.selectedContact[0].phone, [Validators.required, FormsValidationService.numberOnly, Validators.minLength(10), Validators.maxLength(10)]],
      'fax': [this.selectedContact[0].fax, [Validators.required, FormsValidationService.numberOnly, Validators.maxLength(10)]],
      'selected': [false, Validators.required],
      'status': [1, Validators.required],
      'contactId': [this.selectedContact[0].contactId, Validators.nullValidator]
    });
    $('#contactinfo').modal('show');
  }
  verifyCode(val, i) {
    // this.isUnique = this.existingCodes[val] ? true : false;
    this.isUnique.values[i] = false;
    let self = this;
    Object.keys(this.existingCodes).map(function (objectKey, index) {
      var value: any = objectKey;
      value = value.split(' ');
      console.log(value);
      if (!self.isUnique.values[i]) {
        self.isUnique.values[i] = value[i].toLowerCase() == val.toLowerCase() ? true : false;
      }

    });

  }
  back() {
    this.company_list_creation.reset();
    this.address_creation.reset();
    this.contact_creation.reset();
    this.project_creation.reset();
    $('.modal').modal('hide');
  }
  getProjects() {
    this._service.PostService({ "status": 1 }, '/centrallib/getProjectsByClient')
      .subscribe(
      data => {
        this.projects = data.epsProjs;
      }, error => console.log(error)
      )
  }
  saveProject() {
    if (typeof this.project_creation.value.startDate === "object") {
      this.project_creation.value.startDate = this.project_creation.value.startDate.formatted;
    }
    if (typeof this.project_creation.value.finishDate === "object") {
      this.project_creation.value.finishDate = this.project_creation.value.finishDate.formatted;
    }
    this.project_creation.value.cmpId = this.selectedRecord.id;
    const projValues = this.projects.filter(e => {
      return e.projId == this.project_creation.value.projId;
    })[0];
    if (this.project_creation.value.selected == undefined) {
      this.project_creation.value.selected = false;
    }
    if (this.project_creation.value.status == undefined) {
      this.project_creation.value.status = 1;
    }
    this.project_creation.value.projCode = projValues.projCode;
    this.project_creation.value.projName = projValues.projName;
    const req = { companyProjectsTOs: [this.project_creation.value], companyId: this.selectedRecord.id }
    this._service.PostService(req, '/centrallib/saveCompanyCurrentProjs')
      .subscribe(data => {
        this.selectedCurproj = [];
        this.selectedRecord.currentProjs = data.companyProjectsTO;
        this.back();

      }, error => {
        console.log(error);
      })
  }
  deleteProject() {
    const req = { "cmpProjIds": [], "status": 2 };
    this.selectedCurproj.forEach(elm => {
      req.cmpProjIds.push(elm.id)
    });
    this._service.PostService(req, '/centrallib/deleteContacts')
      .subscribe(data => {
        this.selectedContact = [];
        this.getCompanyDetails(this.selectedlist[0].id);
        this.back();

      }, error => {
        console.log(error);
      })
  }
  editProject() {
    this.getProjects();
    let d = new Date(this.selectedCurproj[0].finishDate);
    let d1 = new Date(this.selectedCurproj[0].startDate);
    this.project_creation = this.fb.group({
      'cmpId': [this.selectedCurproj[0].cmpId, Validators.nullValidator],
      'projCode': [this.selectedCurproj[0].projCode, Validators.nullValidator],
      'projName': [this.selectedCurproj[0].projName, Validators.nullValidator],
      'contractValue': [this.selectedCurproj[0].contractValue, Validators.required],
      'startDate': [{ date: { year: d1.getFullYear(), month: d1.getMonth() + 1, day: d1.getDate() }, formatted: this.selectedCurproj[0].startDate }, Validators.required],
      'finishDate': [{ date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }, formatted: this.selectedCurproj[0].finishDate }, Validators.required],
      'performance': [this.selectedCurproj[0].performance, Validators.required],
      'projId': [this.selectedCurproj[0].projId, Validators.required],
      'status': [1, Validators.nullValidator],
      'selected': [false, Validators.nullValidator],
      'id': [this.selectedCurproj[0].id, Validators.nullValidator]
    });
    $('#projectinfo').modal('show');
  }
  moveClosed() {
    debugger;
    const req = { "companyProjectsTOs": this.selectedCurproj, "status": 2 }
    this._service.PostService(req, '/centrallib/moveToCmpClosedProjs')
      .subscribe(data => {
        this.selectedContact = [];
        this.getCompanyDetails(this.selectedlist[0].id);
        this.back();

      }, error => {
        console.log(error);
      })

  }
}
