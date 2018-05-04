import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-weather-classification',
  templateUrl: './weather-classification.component.html',
  styleUrls: ['./weather-classification.component.less'],
  providers: [ApiService]
})
export class WeatherClassificationComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  records = 10;
  weather_creation: FormGroup;
  Isedit = false;
  request = { "weatherCode": null, "weatherName": null, "status": "1" };
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.weather_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
    });

  }
  getWeatherClassification() {
    // let request = { "weatherCode": null, "weatherName": null, "status": "1" };
    this._service.PostService(this.request, '/centrallib/getWeathers')
      .subscribe(
      data => {
        this.List = data.weatherTOs;
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
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
  ngOnInit() {
    this.getWeatherClassification();
  }
  saveDetails() {
    let request;
    if (this.Isedit) {
      this.selectedlist[0].code = this.weather_creation.value.code;
      this.selectedlist[0].name = this.weather_creation.value.name;
      request = { "weatherTOs": [this.selectedlist[0]] }
    } else {
      request = { "weatherTOs": [{ "code": this.weather_creation.value.code, "name": this.weather_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false }] }
    }
    console.log(this.weather_creation.value);
    this._service.PostService(request, '/centrallib/saveWeathers')
      .subscribe(
      data => {
        console.log(data);
        this.weather_creation.reset();
        this.List = data.weatherTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
        $('#weatherclasification').modal('hide');
        // this.router.navigateByUrl('/secure/central/weather-create');
      }
      )
  }
  edit() {
    this.Isedit = true;
    console.log(this.selectedlist[0])
    this.weather_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
    });
    $('#weatherclasification').modal('show');
  }
  reset() {
  this.request = { "weatherCode": null, "weatherName": null, "status": "1" };
  this.getWeatherClassification()
  }
}
