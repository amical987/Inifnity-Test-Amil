import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guard';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { MediaCreateComponent } from './media-create/media-create.component';
import { MediaEditComponent } from './media-edit/media-edit.component';
import { MediaComponent } from './media.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: MediaComponent,
    data: { title: "Media" },
    path: "",
    children: [
      { path: "create", component: MediaCreateComponent, data: { title: "Media Create" }, },
      { path: "edit/:Id", component: MediaEditComponent, data: { title: "Media Edit" }, },
      { path: "", component: MediaGalleryComponent, data: { title: "Media Gallery" } }
    ]
  },
  { path: "", component: HeaderComponent, outlet: "header" },
  { path: "", component: SidebarComponent, outlet: "sidebar" }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MediaRoutingModule { }
