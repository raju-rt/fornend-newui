import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router, Route } from '@angular/router';
import { ApiService } from "../../services"
import { MenuService } from '../../services';



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less'],
    providers: [ApiService]
})
export class SidebarComponent implements OnInit {

    menuItems: Array<any>;
    router: Router;
    constructor(public menu: MenuService, public injector: Injector, private _Service: ApiService, private _route: Router) {
        this.menuItems = menu.getMenu();
        console.log(this.menuItems);

    }
    logout() {
        this._Service.GetService('/logout', '')
            .subscribe(
            data => {
                localStorage.clear();
                this._route.navigateByUrl('/');
            },
            error => {
                alert('Logout is not done')
            }
            );

    }


    onScroll(e) {

        console.log(e.currentTarget.scrollTop);
        $('.menu_scroll').css({ 'margin-top': -e.currentTarget.scrollTop - 32 });

    }

    ngOnInit() {

    }
}
