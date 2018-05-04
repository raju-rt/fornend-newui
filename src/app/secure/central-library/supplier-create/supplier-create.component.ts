import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.less'],
  providers: [ApiService]
})
export class SupplierCreateComponent implements OnInit {

  company_list_creation: FormGroup;
  debugger;
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router, private location: Location) {

    this.company_list_creation = this.fb.group({
      'company_id': [null, Validators.required],
      'company_name': [null, Validators.required],
      'company_category': [null, Validators.required],
      'business_category': [null, Validators.required],
      'business_activity': [null, Validators.required],
      'company_reg_no': [null, Validators.required],
      'company_tax_no': [null, Validators.required]

    });

  }

  ngOnInit() {

  }
  // enbleNext(id) {
  //   jQuery('#' + id).addClass('active');
  // }
  // send(id) {
  //   return this.company_list_creation[id];
  // }
  saveTenent() {
    console.log(this.company_list_creation.value);
    this._service.PostService(this.company_list_creation.value, '/supplier/save')
      .subscribe(
      data => {
        console.log(data);
        this.company_list_creation.reset();
        this.router.navigateByUrl('/secure/central/supplier-list');
      }
      )
  }
  back() {
    this.company_list_creation.reset();
    this.location.back();

  }
}