import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { TenantlistComponent } from './tenantlist/tenantlist.component';
import { SharedModule } from '../../shared/shared.module';
import { TenantvieweditComponent } from './tenantviewedit/tenantviewedit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersprofilesPrivilegesComponent } from './usersprofiles-privileges/usersprofiles-privileges.component';
import { ModuleComponent } from './module/module.component';


@NgModule({
  imports: [
    CommonModule,
    TenantRoutingModule,
    FormsModule,
    ReactiveFormsModule, SharedModule
  ],
  declarations: [TenantComponent, TenantlistComponent, TenantvieweditComponent, UserListComponent,
    UsersprofilesPrivilegesComponent, ModuleComponent],
})
export class TenantModule { }
