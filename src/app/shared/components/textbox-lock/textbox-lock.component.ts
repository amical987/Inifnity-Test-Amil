import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-textbox-lock',
    templateUrl: './textbox-lock.component.html',
    styleUrls: ['./textbox-lock.component.scss']
})
export class TextboxLockComponent implements OnInit {

    constructor() { }
    @Input() form: FormGroup;
    @Input() editCodeName: boolean = false;
    @Input() isNew: boolean = false;
    @Input() layout: string;


    ngOnInit(): void {
    }
}
