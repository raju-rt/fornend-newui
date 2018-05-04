import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public settings: SettingsService, fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.loginForm = fb.group({
      // 'username': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'username': ['E-108A', Validators.required],
      'password': ['e108a', Validators.required],
      'clientcode': ['RajuTech1', Validators.nullValidator]
    });

  }

  login() {
    if (this.loginForm.valid) {
      console.log('Valid!');
      let isLoggedin: any = true;
      this._service.PostService('', '/account/authentication', this.loginForm.value)
        .subscribe(
        data => {
          var response = data;
          console.log(data);
          const isLoggedin = "true";
          if (isLoggedin) {
            localStorage.setItem('isLoggedin', isLoggedin);
            this.router.navigate(['/secure']);
          }
          const uzr = JSON.stringify(response);
          localStorage.setItem('uzrData', uzr);
          localStorage.setItem('token', response.token);
          let authdata = JSON.stringify(response.appCodeTemplate);
          localStorage.setItem('isAuth', authdata);
          console.log(localStorage.getItem('isLoggedin'));

        },
        error => console.log(error),
        () => console.log('everythin')
        );

    }

  }

  ngOnInit() {

  }

}
