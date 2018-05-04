import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoutesModule } from './auth-routes.module';
import { SettingsService } from '../shared';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RoutesModule,
    FormsModule, ReactiveFormsModule, SharedModule
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [SettingsService]
})
export class AuthenticationModule { }
