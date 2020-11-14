import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from './services/overlay.service';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { OverlayYesNoComponent } from './overlay-yes-no/overlay-yes-no.component';
import { OverlayContentTreeComponent } from './overlay-content-tree/overlay-content-tree.component';
import { FieldTypesModule } from '../field-types/field-types.module';
import { OverlayTemplateTreeComponent } from './overlay-template-tree/overlay-template-tree.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { SiteIconsComponent } from './site-icons/site-icons.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [OverlayYesNoComponent, OverlayContentTreeComponent, OverlayTemplateTreeComponent, NotificationMessageComponent, SiteIconsComponent],
    providers: [OverlayService],
    imports: [
        CommonModule,
        FieldTypesModule,
        MaterialCustomModule,
        SharedModule
    ],
    entryComponents: [OverlayYesNoComponent, OverlayContentTreeComponent, OverlayTemplateTreeComponent, NotificationMessageComponent, SiteIconsComponent],
    exports: [SiteIconsComponent]
})
export class OverlayModule { }
