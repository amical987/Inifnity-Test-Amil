import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTemplatesRoutingModule } from './data-templates-routing.module';
import { DataTemplatesComponent } from './data-templates.component';
import { DataTemplateDesignComponent } from './data-template-design/data-template-design.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldTypesModule } from '../field-types/field-types.module';
import { DataTemplateSettingsComponent } from './data-template-settings/data-template-settings.component';
import { DataTemplateNavigationComponent } from './data-template-navigation/data-template-navigation.component';
import { DesignTemplateFormComponent } from './design-template-form/design-template-form.component';
import { DataTemplateApiService } from './services/data-template-api.service';
import { ValidationTypeApiService } from './services/validation-type-api.service';
import { DataTemplatePermissionsComponent } from './data-template-permissions/data-template-permissions.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { DesignTemplateOrderComponent } from './design-template-order/design-template-order.component';
import { OverlayModule } from '../overlay/overlay.module';
import { OverlayFieldSettingsComponent } from './overlay-field-settings/overlay-field-settings.component';
import { FormBuilderService } from './services/form-builder.service';

@NgModule({
    declarations: [DataTemplatesComponent, DataTemplateDesignComponent, DataTemplateSettingsComponent, DataTemplateNavigationComponent, DesignTemplateFormComponent, DataTemplatePermissionsComponent, DesignTemplateOrderComponent, OverlayFieldSettingsComponent],
    imports: [
        CommonModule,
        DataTemplatesRoutingModule,
        FieldTypesModule,
        LayoutModule,
        ReactiveFormsModule,
        SharedModule,
        OverlayModule,
        MaterialCustomModule
    ], providers: [
        DataTemplateApiService,
        ValidationTypeApiService,
        FormBuilderService
    ], entryComponents: [OverlayFieldSettingsComponent]
})
export class DataTemplatesModule { }
