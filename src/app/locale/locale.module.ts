import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { LocaleBottomSheetComponent } from './locale-bottom-sheet/locale-bottom-sheet.component';
import { LocaleCreateComponent } from './locale-create/locale-create.component';
import { LocaleEditComponent } from './locale-edit/locale-edit.component';
import { LocaleListComponent } from './locale-list/locale-list.component';
import { LocaleRoutingModule } from './locale-routing.module';
import { LocaleComponent } from './locale.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MaterialCustomModule,
    RouterModule,
    FormsModule,
    LocaleRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    LocaleComponent,
    LocaleCreateComponent,
    LocaleListComponent,
    LocaleEditComponent,
    LocaleBottomSheetComponent
  ],
  entryComponents: [LocaleBottomSheetComponent]
})
export class LocaleModule { }
