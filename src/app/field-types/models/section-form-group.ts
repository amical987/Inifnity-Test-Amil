import { SectionField } from 'src/app/content';
import { FormGroup } from '@angular/forms';

export class SectionFormGroup {
    sections: SectionField[];
    formGroup: FormGroup;
    validationMessages: any;

    constructor(options: {
        sections?: SectionField[],
        formGroup?: FormGroup,
        validationMessages?: any
    } = {}) {
        this.sections = options.sections || [];
        this.formGroup = options.formGroup || new FormGroup({});
        this.validationMessages = options.validationMessages || {};
    }
}

