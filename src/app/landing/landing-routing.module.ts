import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LandingComponent } from "./landing.component";
import { AuthGuard } from '../core/guard/auth-guard.service';

const routes: Routes = [
    {
        path: "",
        canActivate: [AuthGuard],
        data: { title: "landing" },
        component: LandingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {}
