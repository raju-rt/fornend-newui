import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpsComponent } from './eps.component';
import { RoutesModule } from './eps.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, RoutesModule, SharedModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [EpsComponent]
})
export class EpsModule { }
