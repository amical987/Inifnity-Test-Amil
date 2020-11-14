import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { HeaderComponent, FooterComponent } from '../layout';
import { AuthGuard, ContentCreateEditGuard } from '../core/guard';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { ContentCreateEditComponent } from './content-create-edit/content-create.component';

const routes: Routes = [
    {
        path: "",
        canActivate: [AuthGuard],
        component: ContentComponent,
        data: { title: "Content" },
        children: [
            { path: "create/:id/node/:parentId", component: ContentCreateEditComponent, data: { title: "Create content" }, canDeactivate: [ContentCreateEditGuard] },
            { path: "edit/:id", component: ContentCreateEditComponent, data: { title: "Edit", canDeactivate: [ContentCreateEditGuard] } }
        ],
    },
    { path: "", component: HeaderComponent, outlet: "header" },
    { path: "", component: SidebarComponent, outlet: "sidebar" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }

