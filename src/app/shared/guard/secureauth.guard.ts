import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SecureAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(Route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let modules: any = localStorage.getItem('isAuth');
        modules = JSON.parse(modules);
        let isAccessed: any = false;
        if (modules) {
            if (state.url === '/secure/tenant') {
                modules['admin'] ? isAccessed = true : isAccessed = false;
            }
        }
        if (!isAccessed) {
            this.router.navigate(['/404']);
        }
        return isAccessed;
    }
}
