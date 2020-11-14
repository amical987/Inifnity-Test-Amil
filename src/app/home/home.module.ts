import { NgModule } from "@angular/core";
import { HomeComponent } from "./index";
import { HomeRoutingModule } from "./home-routing.module";
import { LayoutModule } from '../layout/layout.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, LayoutModule],
})
export class HomeModule {}
