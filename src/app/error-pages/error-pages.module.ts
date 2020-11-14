import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ErrorPagesRoutingModule } from "./error-pages-routing.module";
import { Error404Component } from "./error-404.component";
import { Error401Component } from './error-401.component';

@NgModule({
    imports: [ErrorPagesRoutingModule, SharedModule],
    declarations: [Error404Component, Error401Component]
})
export class ErrorPagesModule {}
