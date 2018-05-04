import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EpstoolsComponent } from './epstools.component';
import { CalendersComponent } from './calenders/calenders.component';
import { ResourceCurvesComponent } from './resource-curves/resource-curves.component';

const SecureRoutes: Routes = [
    {
        path: '', redirectTo: 'calender'
    },
    {
        path: 'calender', component: CalendersComponent
    },
    {
        path: 'resource', component: ResourceCurvesComponent
    }
];



@NgModule({
    imports: [
        RouterModule.forChild(SecureRoutes),
        CommonModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ],
    providers: []
})

export class RoutesModule {
    constructor() {
    }

}
