
import { Routes } from '@angular/router';
import { AuthGuard, Error404Component } from './shared';
import { TestComponent } from './test/test.component';

export const AppRoutes: Routes = [
    // {
    //     path: '',
    //     loadChildren: './secure/secure.module#SecureModule',
    //     canActivate: [AuthGuard]
    // },

    { path: '', loadChildren: './authentication/authentication.module#AuthenticationModule', canActivate: [AuthGuard] },
    { path: 'secure', loadChildren: './secure/secure.module#SecureModule' },
    { path: 'test', loadChildren: './test/test.module#TestModule' },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '404' }

];

