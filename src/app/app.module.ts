import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.modulee';
import { HttpModule } from '@angular/http';
import { Error404Component } from './shared';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpModule,
    SharedModule.forRoot()
  ],
  providers: [{ provide: 'Window', useValue: window }],
  bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
