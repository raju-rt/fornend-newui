
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.less'],
  providers: [ApiService]
})
export class ModuleComponent implements OnInit {
  modulesData = [];

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {
    // this.UserList_creation = this.fb.group({
    //   'roleDisplay': [null, Validators.required]
    // });


  }

  ngOnInit() {
    this.getModules();
  }
  getModules() {
    let request ={"status":1}
    this._service.PostService(request, '/auth/getModules')
      .subscribe(
      data => {
        this.modulesData = data.moduleTOs;
        this.modulesData.forEach(element => {
          element.checked = false;
        });

        setTimeout(() => {
          jQuery('.addicon').click(function (d) {
            // debugger;
            d.stopPropagation();
            jQuery(this).parents('header').siblings('ul').toggle();
            jQuery(this).toggleClass('active');

          });
        }, 500);
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
}
