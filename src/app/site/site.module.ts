import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteEditComponent } from './site-edit/site-edit.component';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';

@NgModule({
  declarations: [SiteComponent, SiteCreateComponent, SiteListComponent, SiteEditComponent],
  exports: [SiteComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    LayoutModule,
    MaterialCustomModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SiteModule { }
