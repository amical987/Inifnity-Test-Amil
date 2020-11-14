import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { FieldTypesModule } from '../field-types/field-types.module';
import { LayoutModule } from '../layout/layout.module';
import { ContentNavigationBarComponent } from './content-navigation-bar/content-navigation-bar.component';
import { DynamicContentRenderingComponent } from './dynamic-content-rendering/dynamic-content-rendering.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentApiService } from '.';
import { ContentCreateEditComponent } from './content-create-edit/content-create.component';
import { ContentFormService } from './services/content-form.service';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { ContentMenuEventsService } from './services/content-menu-events.service';
import { NewContentOverlayComponent } from './new-content-overlay/new-content-overlay.component';
import { OverlayModule } from '../overlay/overlay.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [ContentComponent, ContentCreateEditComponent, ContentNavigationBarComponent, DynamicContentRenderingComponent, NewContentOverlayComponent],
    imports: [
        CommonModule,
        ContentRoutingModule,
        FieldTypesModule,
        LayoutModule,
        ReactiveFormsModule,
        OverlayModule,
        MaterialCustomModule,
        SharedModule
    ],
    providers: [ContentApiService, ContentFormService, ContentMenuEventsService],
    entryComponents: [NewContentOverlayComponent]
})
export class ContentModule { }
