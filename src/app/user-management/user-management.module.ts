import { NgModule } from "@angular/core";
import { MaterialCustomModule } from "../material-custom/material-custom.module";
import { SharedModule } from "../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { CoreModule } from "../core/core.module";
import { UsersRoutingModule } from "./user-management-routing.module";
import { UserManagementComponent } from "./user-management.component";
import { UserManagementListComponent } from "./user-management-list/user-management-list.component";
import { UserStatusComponent } from "./user-management-account-status/user-management-account-status.component";
import { UserStatusPipe } from "./user-management-account-status/user-management-account-status.pipe";
import { UserManagementAddUserComponent } from "./user-management-add-user/user-management-add-user.component";
import { UserManagementDeleteUserComponent } from './user-management-delete-user/user-management-delete-user.component';
import { UserManagementEditUserComponent } from './user-management-edit-user/user-management-edit-user.component';
import { UserManagementEditUserHeaderComponent } from './user-management-edit-user/user-management-edit-user-header/user-management-edit-user-header.component';
import { UserManagementEditUserStatusComponent } from './user-management-edit-user/user-management-edit-user-status/user-management-edit-user-status.component';
import { UserManagementEditUserBasicInformationComponent } from './user-management-edit-user/user-management-edit-user-basic-information/user-management-edit-user-basic-information.component';
import { UserManagementEditUserResetPasswordComponent } from './user-management-edit-user/user-management-edit-user-reset-password/user-management-edit-user-reset-password.component';
import { UserManagementEditUserRolesComponent } from './user-management-edit-user/user-management-edit-user-roles/user-management-edit-user-roles.component';

@NgModule({
    declarations: [
        UserManagementListComponent,
        UserStatusComponent,
        UserStatusPipe,
        UserManagementComponent,
        UserManagementAddUserComponent,
        UserManagementDeleteUserComponent,
        UserManagementEditUserComponent,
        UserManagementEditUserHeaderComponent,
        UserManagementEditUserStatusComponent,
        UserManagementEditUserBasicInformationComponent,
        UserManagementEditUserResetPasswordComponent,
        UserManagementEditUserRolesComponent
    ],
    entryComponents: [UserManagementAddUserComponent],
    imports: [
        LayoutModule,
        UsersRoutingModule,
        SharedModule,
        MaterialCustomModule,
        CoreModule
    ]
})
export class UserManagementModule {
}
