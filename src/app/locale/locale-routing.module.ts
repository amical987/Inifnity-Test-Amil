import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guard/auth-guard.service';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { LocaleCreateComponent } from './locale-create/locale-create.component';
import { LocaleEditComponent } from './locale-edit/locale-edit.component';
import { LocaleComponent } from './locale.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: LocaleComponent,
    data: { title: "Locale" },
    path: "",
  },
  {
    path: "create",
    component: LocaleCreateComponent,
    data: { title: "Locale Create" },
  },
  {
    path: "edit/:Id",
    component: LocaleEditComponent,
    data: { title: "Locale Edit" },
  },
  { path: "", component: HeaderComponent, outlet: "header" },
  { path: "", component: SidebarComponent, outlet: "sidebar" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LocaleRoutingModule { }
