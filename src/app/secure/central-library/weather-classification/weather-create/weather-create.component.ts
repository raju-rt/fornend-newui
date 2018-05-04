import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-create',
  templateUrl: './weather-create.component.html',
  styleUrls: ['./weather-create.component.less'],
  providers: [ApiService]
})
export class WeatherCreateComponent implements OnInit {

  weather_creation: FormGroup;
  debugger;
  constructor(private fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.weather_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
    });

  }

  ngOnInit() {

  }

  saveDetails() {
    let request = { "weatherTOs": [{ "code": this.weather_creation.value.code, "name": this.weather_creation.value.name, "status": 1, "selected": false, "duplicateFlag": false }] }
    console.log(this.weather_creation.value);
    this._service.PostService(request, '/centrallib/saveWeathers')
      .subscribe(
      data => {
        console.log(data);
        this.weather_creation.reset();
        this.router.navigateByUrl('/secure/central/weather-create');
      }
      )
  }

}
