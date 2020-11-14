import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guard';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteEditComponent } from './site-edit/site-edit.component';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    data: { title: "Site" },
    path: "",
    canActivate: [AuthGuard],
    component: SiteComponent,
  },
  {
    data: { title: "Create Site" },
    path: "create",
    canActivate: [AuthGuard],
    component: SiteCreateComponent,
  },
  {
    data: { title: "Edit Site" },
    path: "edit/:Id",
    canActivate: [AuthGuard],
    component: SiteEditComponent,
  },
  { path: "", component: HeaderComponent, outlet: "header" },
  { path: "", component: SidebarComponent, outlet: "sidebar" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule { }
