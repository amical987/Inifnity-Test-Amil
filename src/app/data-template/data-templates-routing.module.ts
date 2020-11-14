import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTemplatesComponent } from './data-templates.component';
import { AuthGuard } from '../core/guard';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { DataTemplateDesignComponent } from './data-template-design/data-template-design.component';
import { DataTemplateSettingsComponent } from './data-template-settings/data-template-settings.component';
import { DataTemplatePermissionsComponent } from './data-template-permissions/data-template-permissions.component';
import { DataTemplateCreateEditGuard } from '../core/guard/forms/data-template-create-edit-guard.service';

const routes: Routes = [
    {
        path: "",
        canActivate: [AuthGuard],
        component: DataTemplatesComponent,
        data: { title: "Content" },
        children: [
            { path: "", component: DataTemplateDesignComponent, data: { title: "New" }, canDeactivate: [DataTemplateCreateEditGuard] },
            { path: "create/:parentId", component: DataTemplateDesignComponent, data: { title: "New" }, canDeactivate: [DataTemplateCreateEditGuard] },
            { path: "design/:id", component: DataTemplateDesignComponent, data: { title: "Design" }, canDeactivate: [DataTemplateCreateEditGuard] },
            { path: "settings/:id", component: DataTemplateSettingsComponent, data: { title: "Settings" } },
            { path: "permissions/:id", component: DataTemplatePermissionsComponent, data: { title: "Permissions" } },
        ],
    },
    { path: "", component: HeaderComponent, outlet: "header" },
    { path: "", component: SidebarComponent, outlet: "sidebar" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataTemplatesRoutingModule { }
