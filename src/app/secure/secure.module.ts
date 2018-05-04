import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesModule } from './secure-routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutesModule, SharedModule
  ],
  declarations: [
  ],
  providers: [
    // MenuService, SettingsService, UserblockService
  ]
})
export class SecureModule { }
