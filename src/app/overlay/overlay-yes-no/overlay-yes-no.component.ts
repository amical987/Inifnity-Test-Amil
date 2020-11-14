import { Component, OnInit } from '@angular/core';
import { ControlOverlayRef } from '../models';

@Component({
    templateUrl: './overlay-yes-no.component.html',
    styleUrls: ['./overlay-yes-no.component.scss']
})
export class OverlayYesNoComponent implements OnInit {

    constructor(public dialogRef: ControlOverlayRef) { }

    ngOnInit(): void {
    }

    close(value: boolean): void {
        this.dialogRef.close(value);
    }
}
