import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../core/guard/auth-guard.service";
import { PermissionGuard } from "../core/guard/permission-guard.service";
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { HeaderComponent } from "../layout/header/header.component";
import { UserManagementComponent } from "./user-management.component";
import { UserManagementListComponent } from "./user-management-list/user-management-list.component";
import { UserManagementEditUserComponent } from './user-management-edit-user/user-management-edit-user.component';

const routes: Routes = [
    {
        path: "",
        canActivate: [AuthGuard],
        canActivateChild: [PermissionGuard],
        component: UserManagementComponent,
        data: { title: "User Management" },
        children: [
            {
                path: "",
                redirectTo: "list",
                pathMatch: "full",
                data: { title: "User Management" },
            },
            {
                path: "list",
                component: UserManagementListComponent,
                data: { title: "List of Users" }
            },
            {
                path: ":id",
                component: UserManagementEditUserComponent,
                data: { title: "Edit User" }
            }
        ]
    },
    { path: "", component: HeaderComponent, outlet: "header" },
    { path: "", component: SidebarComponent, outlet: "sidebar" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
