import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { FieldTypesModule } from '../field-types/field-types.module';
import { LayoutModule } from '../layout/layout.module';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { MediaCreateComponent } from './media-create/media-create.component';
import { MediaEditComponent } from './media-edit/media-edit.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { MediaApiService } from './services/media-api.service';

@NgModule({
  declarations: [
    MediaComponent,
    MediaCreateComponent,
    MediaEditComponent,
    MediaGalleryComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    LayoutModule,
    MaterialCustomModule,
    FormsModule,
    RouterModule,
    FieldTypesModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [MediaApiService]
})
export class MediaModule { }
