import { BaseFormControl } from './base-form-control';

export class Dropdown extends BaseFormControl<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
