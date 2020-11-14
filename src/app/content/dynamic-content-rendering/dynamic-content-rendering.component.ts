import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, FormGroupName } from '@angular/forms';
import { BaseFormControl } from 'src/app/field-types';

@Component({
    selector: 'app-dynamic-content-rendering',
    templateUrl: './dynamic-content-rendering.component.html',
    styleUrls: ['./dynamic-content-rendering.component.scss']
})
export class DynamicContentRenderingComponent implements OnInit {
    @Input() control: BaseFormControl<string>;
    @Input() customFormName: FormGroup;
    @Input() validationMessage: { [key: string]: string } = {};

    get isValid() { return this.customFormName.controls[this.control.key].valid; }

    constructor() { }

    ngOnInit() {
    }
}
