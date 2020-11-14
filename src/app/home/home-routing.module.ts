import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guard/auth-guard.service';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        children: [
            {
                canActivate: [AuthGuard],
                component: HomeComponent,
                data: { title: "Home", showTopTitleBar: true },
                path: "",
            },
            { path: "", component: HeaderComponent, outlet: "header" },
            { path: "", component: SidebarComponent, outlet: "sidebar" }
        ],
        path: "",
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
