import { Injectable } from '@angular/core';
import { Field } from 'src/app/content';
import { BaseFormControl, Textbox, Dropdown, Textarea } from '..';

@Injectable()
export class FieldMappingFactory {
    constructor() { }

    getControl(keyPrefix: string, field: Field): BaseFormControl<string> {
        const controlKey = `${keyPrefix}${field.name}`;
        switch (field.typeControl.controlType) {
            case 'textbox': {
                return new Textbox({
                    key: controlKey,
                    label: field.name,
                    type: field.typeControl.controlType, // example: email, number, date, etc. for texbox
                    value: field.value,
                    order: field.order
                })
            }
            case 'singleLineText': {
                return new Textbox({
                    key: controlKey,
                    label: field.name,
                    type: 'text', // example: email, number, date, etc. for texbox
                    value: field.value,
                    order: field.order
                })
            }
            case 'dropdown': {
                return new Dropdown({
                    key: controlKey,
                    label: field.name,
                    value: field.value, // selected value
                    options: [], // set from API
                    order: field.order
                })
            }
            case 'textarea': {
                return new Textarea({
                    key: controlKey,
                    label: field.name,
                    value: field.value,
                    order: field.order
                })
            }
            case 'richTextEditor': {
                return new Textarea({
                    key: controlKey,
                    label: field.name,
                    value: field.value,
                    order: field.order
                })
            }
            case 'image': {
                return new Textarea({
                    key: controlKey,
                    label: field.name,
                    value: field.value,
                    order: field.order
                })
            }
            default: {
                return new Textbox()
            }
        }
    }
}
