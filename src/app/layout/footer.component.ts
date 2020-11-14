import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./footer.component.html",
    selector: "app-layout-footer"
})
export class FooterComponent implements OnInit {
    constructor() {}

    ngOnInit(): void { }

    year = new Date().getFullYear();
}