import { FormGroup } from '@angular/forms';
import { GenericValidator } from './generic-validator';
import { debounceTime } from 'rxjs/operators';

export class ValidationAggregate {
    private validationMessages: { [key: string]: { [key: string]: string } } = {};
    private genericValidator: GenericValidator;
    displayMessage: { [key: string]: string } = {};

    private bindEventFormValidation(form: FormGroup): void {
        this.displayMessage = this.genericValidator.processMessages(form);
    }

    private bindSubmitFormValidation(form: FormGroup): void {
        this.displayMessage = this.genericValidator.processSubmitMessages(form);
    }

    private bindValueChanges(form: FormGroup): void {
        if (form) {
            form.valueChanges.pipe(
                debounceTime(800)
            ).subscribe(value => {
                this.getValidationErrors(form);
            });
        }
    }

    bindGenericValidator(): void {
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    bindValueChangesWithValidator(form: FormGroup): void {
        this.bindGenericValidator();
        this.bindValueChanges(form);
    }

    addValidationMessage(fieldName: string, validationMessage: { [key: string]: string }) {
        this.validationMessages[fieldName] = validationMessage;
    }

    getValidationErrors(form: FormGroup, isSubmit: boolean = false): void {
        if (isSubmit)
            this.bindSubmitFormValidation(form);
        else
            this.bindEventFormValidation(form);
    }
}
