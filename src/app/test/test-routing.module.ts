
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TestComponent } from './test.component';

const ClientsRoutes: Routes = [
    { path: '', component: TestComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(ClientsRoutes),
    ],
    declarations: [TestComponent],
    exports: [
        RouterModule
    ]
})
export class testRoutingModule {
    constructor() { }

}
