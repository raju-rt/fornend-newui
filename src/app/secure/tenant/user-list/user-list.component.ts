
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  providers: [ApiService]
})

export class UserListComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  saveDeps: any;
  UserList_creation: FormGroup;
  Isedit = true;
  records = 10;
  empCodes;
  autoFillData;
  assignProject = [];
  isEdit = false;
  roles;
  request = { "userName": null, "empCode": null, "status": "1" };
  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {
    this.UserList_creation = this.fb.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required],
      'empCode': [null, Validators.required],
      'empDesg': [null, Validators.required],
      'dispName': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'phone': [null, Validators.required],
      'mobile': [null, Validators.required],
      'roleDisplay': [null, Validators.required],
      'remarks': [null, Validators.required],
    });


  }
  getUsers() {
    this._service.PostService(this.request, '/user/getUsers')
      .subscribe(
      data => {
        this.List = data.users;
        this.List.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  getEmpCodes(edit?) {
    this.empCodes = [];
    const request = {};
    this._service.PostService(request, '/user/getUsersByClientId')
      .subscribe(
      data => {
        this.empCodes = data.labelKeyTOs;
        // debugger;
        if (this.empCodes && edit) {
          const addEditObj = {
            "id": this.selectedlist[0].userRoles[0].id,
            "code": this.selectedlist[0].empCode,
            "name": null,
            "referenceId": null,
            "email": null,
            "date": null,
            "unitOfMeasure": null,
            "displayNamesMap": {
              "firstName": this.selectedlist[0].firstName,
              "lastName": this.selectedlist[0].lastName,
              "gender": "Male",
              "cmpCatgName": this.selectedlist[0].empCode,
              "displayName": this.selectedlist[0].dispName,
              "designation": this.selectedlist[0].empDesg
            },
            "displayNameList": null,
            "selected": true
          }
          this.empCodes.splice(0, 1, addEditObj)
          console.log(this.empCodes[0]);
          this.UserList_creation.patchValue({
            empCode: addEditObj,
            password: this.selectedlist[0].password,
            empDesg: this.selectedlist[0].empDesg,
            dispName: this.selectedlist[0].dispName,
            firstName: this.selectedlist[0].firstName,
            lastName: this.selectedlist[0].lastName,
            userName: this.selectedlist[0].userName,
            phone: this.selectedlist[0].phone,
            mobile: this.selectedlist[0].mobile,
            remarks: this.selectedlist[0].remarks,
            email: this.selectedlist[0].email

          });
        }
        console.log(this.UserList_creation.value);
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  getRoles(edit?) {
    this.roles = [];
    const request = { "status": 1 };
    this._service.PostService(request, '/auth/getRoles')
      .subscribe(
      data => {
        this.roles = data.roleTOs;
        // prompt("hello", JSON.stringify(this.roles[0]))
        if (edit) {
          const addroles = {
            "clientId": null,
            "clientCode": null,
            "status": 1,
            "roleId": this.selectedlist[0].userRoles[0].roleId,
            "roleName": this.selectedlist[0].roleDisplay,
            "defaultRole": true,
            "parentId": null,
            "select": false
          }
          this.roles.splice(0, 1, addroles)
          this.UserList_creation.patchValue({
            roleDisplay: addroles
          })
        }
        console.log(this.roles);
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  viewRecord(userId) {

    const request = { "userId": userId, "status": 1 };
    this._service.PostService(request, '/user/getUserProjects')
      .subscribe(
      data => {
        this.assignProject = data.userProjDetailsTOs;
        console.log(data);
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
    // record = JSON.stringify(record);
    // alert(record);
  }

  saveProject() {
    const request = { "userProjectTOs": this.assignProject };
    this._service.PostService(request, '/user/saveUserProjects')
      .subscribe(
      data => {
        if (data) {
          alert(data.message);
        }
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
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
    this.getUsers();

  }
  CreateNew(edit?) {
    if (edit) {
      this.isEdit = true;
    }
    else {
      this.UserList_creation.reset();
      this.selectedlist = [];

    }
    this.getEmpCodes(edit);
    this.getRoles(edit);
    $('.modal').modal('show');
  }

  saveDetails() {
    console.log(this.UserList_creation.value);
    let request: any;
    if (this.isEdit) {
      request = {
        "userTOs": [
          this.selectedlist[0]]
      };
      const rolesss = [this.UserList_creation.value.roleDisplay]
      request.userTOs[0].userName = this.UserList_creation.value.userName;
      request.userTOs[0].password = this.UserList_creation.value.password;
      request.userTOs[0].empCode = this.UserList_creation.value.empCode.code;
      request.userTOs[0].empDesg = this.UserList_creation.value.empDesg;
      request.userTOs[0].dispName = this.UserList_creation.value.dispName;
      request.userTOs[0].firstName = this.UserList_creation.value.firstName;
      request.userTOs[0].lastName = this.UserList_creation.value.lastName;
      request.userTOs[0].email = this.UserList_creation.value.email;
      request.userTOs[0].phone = this.UserList_creation.value.phone;
      request.userTOs[0].mobile = this.UserList_creation.value.mobile;
      request.userTOs[0].remarks = this.UserList_creation.value.remarks;
      request.userTOs[0].userRoles = rolesss;
      request.userTOs[0].duplicateFlag = false;
      request.userTOs[0].empRegId = this.UserList_creation.value.empCode.id;
      request.userTOs[0].roleDisplay = this.UserList_creation.value.roleDisplay.roleName;

    } else {
      request = {
        "userTOs": [
          {
            "userId": null,
            "select": false,
            "status": 1,
            "userName": this.UserList_creation.value.userName,
            "password": this.UserList_creation.value.password,
            "empCode": this.UserList_creation.value.empCode.code,
            "empDesg": this.UserList_creation.value.empDesg,
            "dispName": this.UserList_creation.value.dispName,
            "firstName": this.UserList_creation.value.firstName,
            "lastName": this.UserList_creation.value.lastName,
            "email": this.UserList_creation.value.email,
            "phone": this.UserList_creation.value.phone,
            "mobile": this.UserList_creation.value.mobile,
            "remarks": this.UserList_creation.value.remarks,
            "userRoles": [this.UserList_creation.value.roleDisplay],
            "duplicateFlag": false,
            "empRegId": this.UserList_creation.value.empCode.id,
            "roleDisplay": this.UserList_creation.value.roleDisplay.roleName
          }
        ]
      };
    }
    console.log(request);
    this._service.PostService(request, '/user/saveUser')
      .subscribe(
      data => {
        if (data) {
          this.List = data.users;
          this.UserList_creation.reset();
          this.selectedlist = [];
          alert(data.message);
          $('.modal').modal('hide');

        }
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  empDetalis() {
    let request = { "userName": null, "empCode": null, "status": "1" }
    this._service.PostService(request, '/user/getUsersByClientId')
      .subscribe(
      data => {
        this.List = data.users;
        this.List.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }

  autoFillDataFn(data) {
    this.UserList_creation.patchValue({
      empDesg: data.designation,
      dispName: data.displayName,
      firstName: data.firstName,
      lastName: data.lastName
    });

  }
  reset() {
    this.request = { "userName": null, "empCode": null, "status": "1" };
    this.getUsers();
  }
}
