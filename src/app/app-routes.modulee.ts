import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { AuthGuard } from './shared';

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true })
    ],
    declarations: [],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})

export class AppRoutesModule {
    constructor() {
    }
}
