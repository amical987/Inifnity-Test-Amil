import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { CulturesComponent } from './cultures/cultures.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { FieldTypesModule } from '../field-types/field-types.module';
import { SettingsApiService } from './services/settings-api.service';


@NgModule({
  declarations: [SettingsComponent, CulturesComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutModule,
    MaterialCustomModule,
    ReactiveFormsModule,
    FieldTypesModule
  ],
  providers: [
    SettingsApiService
]
})
export class SettingsModule { }
