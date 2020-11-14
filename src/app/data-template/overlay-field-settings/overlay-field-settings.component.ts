import { Component, OnInit } from '@angular/core';
import { ControlOverlayRef } from 'src/app/overlay/models';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ValidationTypeApiService } from '../services/validation-type-api.service';
import { ValidationTypes, Field } from '../models';
import { ApiResponse } from 'src/app/core/models/api';
import { Guid } from 'guid-typescript';
import _ from 'lodash';
import { GenericValidator } from 'src/app/core';
import { debounceTime } from 'rxjs/operators';

@Component({
    templateUrl: './overlay-field-settings.component.html',
    styleUrls: ['./overlay-field-settings.component.scss']
})
export class OverlayFieldSettingsComponent implements OnInit {
    private validationMessages: { [key: string]: { [key: string]: string } } = {};
    private genericValidator: GenericValidator;
    fieldSettings: FormGroup;
    field: Field;
    validationTypes: ValidationTypes[];
    validationEdit: { [key: string]: boolean } = {};
    isValidationEdit: boolean = false;
    editCodeName: boolean = false;
    isNew: boolean;
    displayMessage: { [key: string]: string } = {};

    get validations(): FormArray {
        return this.fieldSettings.get('fieldValidations') as FormArray;
    }

    constructor(private formBuilder: FormBuilder, private validationTypeApiService: ValidationTypeApiService, public dialogRef: ControlOverlayRef) { }

    ngOnInit(): void {
        this.bindData(this.dialogRef.data);
        this.validationTypeApiService.getValidationTypes().subscribe((response: ApiResponse<ValidationTypes[]>) => {
            this.validationTypes = response.records;
        });
        this.setFormValidation();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    apply(): void {
        if (this.fieldSettings.valid && this.fieldSettings.dirty) {
            this.dialogRef.close(this.fieldSettings);
        } else {
            this.generateValidationMessage(true);
        }
    }

    setFormValidation(): void {
        this.validationMessages['name'] = {
            required: 'Name is required.' // TO DO - Get from settings
        };
        this.validationMessages['value'] = {
            required: 'value is required.' // TO DO - Get from settings
        };
        this.genericValidator = new GenericValidator(this.validationMessages);

        if (this.fieldSettings) {
            this.fieldSettings.valueChanges.pipe(
                debounceTime(800)
            ).subscribe(value => {
                this.generateValidationMessage(false);
            });
        }
    }

    generateValidationMessage(isSubmit: boolean): void {
        this.displayMessage = isSubmit ? this.genericValidator.processSubmitMessages(this.fieldSettings) : this.genericValidator.processMessages(this.fieldSettings);
        for (let index = 0; index < this.validations.length; index++) {
            let erorrDetails = isSubmit ? this.genericValidator.processSubmitMessages(this.validations.at(index) as FormGroup) : this.genericValidator.processMessages(this.validations.at(index) as FormGroup);
            for (const [key, value] of Object.entries(erorrDetails)) {
                this.displayMessage[key] = value;
            }
        }
    }

    getValidationName(id: string): string {
        return _.find(this.validationTypes, validation => { return validation.id == id }).displayName;
    }

    applyValidation(key: any): void {
        if (this.validations.valid) {
            this.validationEdit[key] = false;
            this.isValidationEdit = false;
        }
        else {
            for (let index = 0; index < this.validations.length; index++) {
                let erorrDetails = this.genericValidator.processSubmitMessages(this.validations.at(index) as FormGroup);
                for (const [key, value] of Object.entries(erorrDetails)) {
                    this.displayMessage[key] = value;
                }
            }
        }
    }

    delete(index: any): void {
        this.validations.removeAt(index);
    }

    cancelValidation(index: any): void {
        this.validationEdit[index] = false;
        this.isValidationEdit = false;
        this.validations.removeAt(index);
    }

    bindData(field: Field): void {
        this.field = field;
        this.isNew = field.id == Guid.EMPTY;
        this.fieldSettings = new FormGroup({
            id: new FormControl(field.id),
            name: new FormControl(field.name, Validators.required),
            codeName: new FormControl({ value: field.codeName, disabled: this.editCodeName }),
            description: new FormControl(field.description),
            defaultValue: new FormControl(field.defaultValue),
            isIndexed: new FormControl(field.isIndexed),
            helpDescription: new FormControl(field.helpDescription),
            fieldTypeId: new FormControl(field.fieldTypeId),
            isRequired: new FormControl(field.isRequired),
            order: new FormControl(field.order),
            fieldValidations: this.formBuilder.array(
                field.fieldValidations.map(fieldValidation => new FormGroup({
                    id: new FormControl(fieldValidation.id),
                    fieldId: new FormControl(field.id),
                    validationId: new FormControl(fieldValidation.validationId),
                    value: new FormControl(fieldValidation.value, Validators.required),
                    errorMessage: new FormControl(fieldValidation.errorMessage)
                }))
            )
        });
    }

    addNew(): void {
        this.validationEdit[this.validations.length] = true;
        this.isValidationEdit = true;
        this.validations.push(this.formBuilder.group({
            id: new FormControl(Guid.EMPTY),
            fieldId: new FormControl(this.field.id),
            validationId: new FormControl(this.validationTypes[0].id),
            value: new FormControl('', Validators.required),
            errorMessage: new FormControl('')
        }));
    }
}
