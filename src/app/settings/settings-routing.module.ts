import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { AuthGuard } from '../core/guard';
import { CulturesComponent } from './cultures/cultures.component';

const routes: Routes = [
    {
      path: "",
      canActivate: [AuthGuard],
      component: SettingsComponent,
      data: { title: "Settings" },
      children: [
          { path: "cultures", component: CulturesComponent, data: { title: "Settings Cultures" } }
      ]
    },
    { path: "", component: HeaderComponent, outlet: "header" },
    { path: "", component: SidebarComponent, outlet: "sidebar" },
  ];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule { }
