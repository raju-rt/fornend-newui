import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit {
  togggled: any = false;
  tenantList: any;
  tenantDetails: any;
  records = 10;
  clickedrecord = 0;
  constructor(private _service: ApiService, private _route: Router) {

  }
  getTenantList() {
    var request = { "cmpCode ": null, "cmpName ": null, "status": "1" };
    this._service.PostService(request, '/user/getUsers')
      .subscribe(
      data => {
        this.tenantList = data.users;
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  viewTenant(tenant) {
    this.tenantDetails = tenant.tenant_code;
    this.clickedrecord = tenant.userId;
    // $('#tanantInfo').modal('show');
    // this._route.navigateByUrl('/secure/tenant/edit')
    this._route.navigate(['/secure/tenant/edit', this.tenantDetails]);

  }

  ngOnInit() {
    this.getTenantList();
  }
}

