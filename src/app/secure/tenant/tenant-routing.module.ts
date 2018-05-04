import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { TenantlistComponent } from './tenantlist/tenantlist.component';
import { TenantvieweditComponent } from './tenantviewedit/tenantviewedit.component';
import { SecureAuthGuard } from './auth';
import { UserListComponent } from './user-list/user-list.component';
import { UsersprofilesPrivilegesComponent } from './usersprofiles-privileges/usersprofiles-privileges.component';
import { ModuleComponent } from './module/module.component';
const routes: Routes = [
  { path: '', component: TenantlistComponent },
  { path: 'tenantlist', component: TenantlistComponent, canActivate: [SecureAuthGuard] },
  { path: 'userslist', component: UserListComponent },
  { path: 'usersPP', component: UsersprofilesPrivilegesComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'edit/:id', component: TenantvieweditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SecureAuthGuard]
})
export class TenantRoutingModule { }
