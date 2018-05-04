import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EpsComponent } from './eps.component';

const SecureRoutes: Routes = [
    {
        path: '', component: EpsComponent
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
