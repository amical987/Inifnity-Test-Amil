import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer.component';
import { HeaderMyProfileComponent } from './header-my-profile/header-my-profile.component';
import { HeaderComponent } from './header/header.component';
import { LayoutService } from './services/layout.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialCustomModule } from '../material-custom/material-custom.module';

@NgModule({
    imports: [RouterModule, SharedModule, MaterialCustomModule],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HeaderMyProfileComponent,
        BreadcrumbComponent
    ],
    providers: [LayoutService],
    exports: [HeaderComponent, FooterComponent, SidebarComponent, BreadcrumbComponent]
})
export class LayoutModule { }
