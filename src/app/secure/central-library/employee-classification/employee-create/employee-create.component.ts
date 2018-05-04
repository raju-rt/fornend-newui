import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.less'],
  providers: [ApiService]
})
export class EmployeeCreateComponent implements OnInit {

  Employee_creation: FormGroup;
  measuresList = [];
  existingCodes = [];
  isUnique;
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.Employee_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'measureUnitTO': ['', Validators.required]
    });

  }

  ngOnInit() {
    this.getCodes();
    this.getMeasures();
  }

  saveDetails() {
    let request = {
      "empClassTOs": [{
        "code": this.Employee_creation.value.code, "name": this.Employee_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false, "measureUnitTO":
          this.measuresList.filter(it => {
            return it.id == this.Employee_creation.value.measureUnitTO
          })[0], "measureId": parseInt(this.Employee_creation.value.measureUnitTO)
      }]
    }
    console.log(this.Employee_creation.value);
    this._service.PostService(request, '/centrallib/saveEmpClasses')
      .subscribe(
      data => {
        console.log(data);
        this.Employee_creation.reset();
        this.router.navigateByUrl('/secure/central/employee-classification');
      }
      )
  }

  getMeasures() {
    let request = { "status": 1, "procureClassId": 1 };
    // 
    this._service.PostService(request, "/centrallib/getMeasuresByProcureType")
      .subscribe(data => {
        this.measuresList = data.measureUnitTOs;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  getMval(measure) {
    return JSON.stringify(measure)
  }
  getCodes() {
    let request = {};
    this._service.PostService(request, "/centrallib/getEmpClassMap")
      .subscribe(data => {
        this.existingCodes = data.uniqueCodeMap;
      },
      error => {
        console.log(error);
      },
      () => console.log("success"))
  }
  verifyCode(val) {
    this.isUnique = this.existingCodes[val] ? true : false;
  }

}

