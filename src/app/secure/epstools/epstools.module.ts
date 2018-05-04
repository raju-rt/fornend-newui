import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpstoolsComponent } from './epstools.component';
import { CalendersComponent } from './calenders/calenders.component';
import { RoutesModule } from './epstools.routing ';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResourceCurvesComponent } from './resource-curves/resource-curves.component';

@NgModule({
  imports: [
    CommonModule, RoutesModule, SharedModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [EpstoolsComponent, CalendersComponent, ResourceCurvesComponent,]
})
export class EpstoolsModule { }
