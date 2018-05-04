import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from "@angular/common";
@Component({
  selector: 'app-tenantviewedit',
  templateUrl: './tenantviewedit.component.html',
  styleUrls: ['./tenantviewedit.component.less'],
  providers: [ApiService]
})
export class TenantvieweditComponent implements OnInit {
  client_registration_form: FormGroup;
  isEdit = false;
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router, private activeRoute: ActivatedRoute, private location: Location) {
  }
  ngOnInit() {
    this.tenantForm({});
    this.activeRoute.params.subscribe(params => {
      this.getTenantData(params['id']);
      // this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }


  getTenantData(id) {
    this._service.GetService('/tenant/?id=' + id, '')
      .subscribe(
      data => {
        this.tenantForm(data.response.data);
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }



  tenantForm(value) {
    this.client_registration_form = this.fb.group({
      'tenant_details': this.fb.group({
        'tenant_code': [value.tenant_code || null, Validators.required],
        'tenant_name': [value.tenant_name || null, Validators.required],
        'nature_of_business': [value.nature_of_business || null, Validators.required],
        'url': [value.url || null, Validators.required],
        'address': [value.address || null, Validators.required],
        'country': [value.country || '', Validators.required],
      }),
      'licence_details': this.fb.group({
        'no_of_users': [value.no_of_users || null, Validators.required],
        'start_date': [value.start_date || null, Validators.required],
        'end_date': [value.end_date || null, Validators.required],
      }),
      'contact_details': this.fb.group({
        'contact_personname': [value.contact_person_name || null, Validators.required],
        'contact_number': [value.contact_number || null, Validators.required],
        'email': [value.email || null, Validators.required],
        'fax': [value.fax || null, Validators.required]
      })
    });
    this.disableForm();

  }
  disableForm() {
    let sma: any = this.client_registration_form.controls;
    for (let subform in sma) {
      let subforms = sma[subform].controls
      for (let control in subforms) {
        subforms[control].disable();
      }
    }
  }
  enableForm() {
    this.isEdit = true;
    let sma: any = this.client_registration_form.controls;
    for (let subform in sma) {
      let subforms = sma[subform].controls
      for (let control in subforms) {
        subforms[control].enable();
      }
    }
  }
  saveTenent() {




    this._service.PostService(this.client_registration_form.value, '/tenant/update')
      .subscribe(
      data => {
        if (data.response.status == 200) {
          alert('Successfully updated');
          this.location.back();
          // this.isEdit = !this.isEdit;
          //   this.disableForm();
          //   this.tenantForm({});
        }
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );





    // this._service.PostService(this.client_registration_form.value, '/tenant/save')
    //   .subscribe(
    //   data => {
    //     console.log(data);
    //     this.client_registration_form.reset();
    //   }
    //   )

  }
}
