import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
@Component({
    selector: 'app-measuring-create',
    templateUrl: './measuring-create.component.html',
    styleUrls: ['./measuring-create.component.less'],
    providers: [ApiService]
})
export class MeasuringCreateComponent implements OnInit {

    measures_creation: FormGroup;
    existingCodes = [];
    isUnique = false;
    CategoryList = [];
    constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

        this.measures_creation = this.fb.group({
            'measurement_code': [null, Validators.required],
            'measurement_name': [null, Validators.required],
            'classification': ['', Validators.required],
            'status': [true, Validators.required],

        });

    }

    ngOnInit() {
        this.getCategory();
        this.getCodes();
    }
    getCategory() {

        console.log(this.measures_creation.value);
        this._service.PostService('', '/centrallib/getprocures')
            .subscribe(
            data => {
                console.log(data);
                this.CategoryList = data.procurementTOs;
            },
            error => {
                console.log(error);
            },
            () => console.log("success")
            )
    }
    getCodes() {
        let request = {};
        this._service.PostService(request, "/centrallib/getMeasurementMap")
            .subscribe(data => {
                this.existingCodes = data.uniqueCodeMap;
            },
            error => {
                console.log(error);
            },
            () => console.log("success"))
    }
    saveMeasure() {
        console.log(this.measures_creation.value);
        this._service.PostService(this.measures_creation.value, '/measuring_units/save')
            .subscribe(
            data => {
                console.log(data);
                this.measures_creation.reset();
                this.router.navigateByUrl('/secure/central/measuring-units');
            }
            )
    }
    verifyCode(val) {
        this.isUnique = this.existingCodes[val] ? true : false;
    }

}
