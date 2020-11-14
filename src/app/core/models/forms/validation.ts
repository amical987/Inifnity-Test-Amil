import { ValidatorFn } from '@angular/forms';

export class Validation {
    rule: string;
    value: string;
    message: string;
}

export class ValidationRules {
    validators: ValidatorFn[] = [];
    messages: { [key: string]: string } = {};
}
