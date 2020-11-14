import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-panel',
    templateUrl: './error-panel.component.html',
    styleUrls: ['./error-panel.component.scss']
})
export class ErrorPanelComponent implements OnInit {
    serverErrors: any;

    constructor() { }

    ngOnInit(): void {
    }
}
