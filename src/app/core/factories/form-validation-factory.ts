import { Injectable } from '@angular/core';
import { Validation, ValidationRules } from '../models/forms/validation';
import { Validators, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: "root" })
export class FormValidationFactory {

    public getValidators(validations: Validation[]): ValidationRules {
        let validationRules = new ValidationRules();
        if (validations != undefined) {
            validations.forEach(validation => {
                validationRules.validators.push(this.getValidator(validation.rule, validation.value));
                validationRules.messages[validation.rule] = validation.message;
            });
        }
        return validationRules;
    }

    public getValidator(rule: string, value: string): ValidatorFn {
        switch (rule) {
            case 'required': {
                return Validators.required;
            }
            case 'min': {
                return Validators.min(+value);
            }
            case 'max': {
                return Validators.max(+value);
            }
            case 'maxLength': {
                return Validators.maxLength(+value);
            }
            case 'minLength': {
                return Validators.minLength(+value);
            }
            case 'requiredTrue': { // example: checkbox
                return Validators.requiredTrue;
            }
            case 'pattern': {
                return Validators.pattern(value);
            }
        }
    }
}

