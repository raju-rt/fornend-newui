import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SecureAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(Route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let modules: any = localStorage.getItem('uzrData');
        modules = JSON.parse(modules);
        modules = modules.appCodeTemplate;
        let isAccessed: any = false;
        if (modules) {
            if (state.url === '/secure/tenant' || state.url === '/secure/tenant/tenantlist') {
                modules['ADMIN_CLIENTREG_VIEW'] ? isAccessed = true : isAccessed = false;
            }
            if (state.url === '/secure/tenant/registration') {
                modules['ADMIN_CLIENTREG_ADD'] ? isAccessed = true : isAccessed = false;
            }
            if (state.url === '/secure/tenant/edit') {
                modules['ADMIN_CLIENTREG_VIEW'] ? isAccessed = true : isAccessed = false;
            }
        }
        if (!isAccessed) {
            this.router.navigate(['/404']);
        }
        return isAccessed;
    }
}
