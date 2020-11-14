import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    template:
        '<div class="app-loading"><div class="loading-spinner-circle size-64"></div></div>'
})
export class LandingComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit(): void {
        this.router.navigate(["home"], { queryParams: { fromLanding: true } });
    }
}
