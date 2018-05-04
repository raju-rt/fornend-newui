
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './usersprofiles-privileges.component.html',
  styleUrls: ['./usersprofiles-privileges.component.less'],
  providers: [ApiService]
})

export class UsersprofilesPrivilegesComponent implements OnInit {

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
  userPrivileges = [];
  roles;
  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {
    this.UserList_creation = this.fb.group({
      'roleDisplay': [null, Validators.required]
    });


  }
  getUsers() {
    let request = { "userName": null, "empCode": null, "status": "1" }
    this._service.PostService(request, '/auth/getRoles')
      .subscribe(
      data => {
        this.List = data.roleTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }

test=[];
  viewRecord(roleId) {

    const request = {
      "moduleId": null,
      "roleIds": [
        roleId
      ],
      "status": 1
    }
    this._service.PostService(request, '/auth/getModulesByRole')
      .subscribe(
      data => {
        this.userPrivileges = data.moduleTOs;
        this.test=data;
        // this.assignProject = data.userProjDetailsTOs;

        setTimeout(() => {
          jQuery('.addicon').click(function (d) {
            // debugger;
            console.log("fdgdfg");
            d.stopPropagation();
            jQuery(this).parents('header').siblings('ul').toggle();
            jQuery(this).toggleClass('active');

          });
        }, 500);
        console.log(this.userPrivileges);

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
  isEdit = false;
  CreateNew(edit?) {


    if (edit) {
      this.isEdit = true;
      this.UserList_creation.patchValue({

        roleDisplay: this.selectedlist[0].roleName
      })
    }
    else {
      this.selectedlist = [];
      this.UserList_creation.reset();
    }
    $('.modal').modal('show');

  }
  saveDetails() {
    console.log(this.UserList_creation.value);
    let request: any;
    if (this.isEdit) {
      request = {
        'roleTOs': [
          this.selectedlist[0]]
      };
      request.roleTOs[0].roleName = this.UserList_creation.value.roleDisplay;

    } else {
      request = {
        'roleTOs': [
          {
            'roleId': null,
            'roleName': this.UserList_creation.value.roleDisplay,
            'status': 1,
            'duplicateFlag': false
          }
        ]
      }
    }
    console.log(request);
    this._service.PostService(request, '/auth/saveRole')
      .subscribe(
      data => {
        if (data) {
          this.List = data.roleTOs;
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






  Deactivate() {
    const request = {
      "roleIds": [this.selectedlist[0].roleId],
      "status": 2
    }
    this._service.PostService(request, '/auth/deleteRoles')
      .subscribe(
      data => {
        if (data) {
          this.selectedlist = [];
          this.List = data.roleTOs;
          alert(data.message);
        }
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }

  saveRolePermission() {
    const request = {
      "moduleTOs": this.userPrivileges
    };
    console.log(this.userPrivileges);
    prompt('request', JSON.stringify(this.test));
    this._service.PostService(request, '/auth/saveRolePermissions')
      .subscribe(
      data => {
        if (data) {
          // this.selectedlist = [];
          // this.List = data.roleTOs;
          this.userPrivileges = [];
          alert(data.message);
        }
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );

  }
}
