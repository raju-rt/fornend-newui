
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ClientsRoutes: Routes = [
    { path: '', component: DashboardComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(ClientsRoutes),
        CommonModule, SharedModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [DashboardComponent],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
    constructor() { }

}
