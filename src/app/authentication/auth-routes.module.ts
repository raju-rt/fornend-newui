import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { TranslatorService } from '../core/translator/translator.service';
// import { MenuService } from '../core/menu/menu.service';
// import { SharedModule } from '../shared/shared.module';
// import { PagesModule } from './pages/pages.module';

// import { menu } from './menu';
import { AuthRoutes } from './auth-routes';

@NgModule({
    imports: [
        // SharedModule,
        RouterModule.forChild(AuthRoutes),
        // PagesModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor() {
    }
    // constructor(public menuService: MenuService, tr: TranslatorService) {
    //     menuService.addMenu(menu);
    // }
}
