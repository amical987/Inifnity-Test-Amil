import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Error404Component } from './error-404.component';
import { Error401Component } from './error-401.component';


const routes: Routes = [
    {
        path: "404",
        data: { title: "We are sory we are not able to find for what you are looking" },
        component: Error404Component
    },
    {
        path: "401",
        data: { title: "Unauthorized access" },
        component: Error401Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
