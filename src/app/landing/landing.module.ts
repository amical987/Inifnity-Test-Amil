import { NgModule } from "@angular/core";

import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [LandingRoutingModule, SharedModule],
    declarations: [LandingComponent]
})
export class LandingModule {}
