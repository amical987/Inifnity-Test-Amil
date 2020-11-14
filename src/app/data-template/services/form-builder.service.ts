import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { DataTemplate, Field } from '../models';
import { template } from 'lodash';
import _ from 'lodash';

@Injectable()
export class FormBuilderService {
    private defaultControlId: string = '903c6071-a67e-439c-b05e-6cf37460fc66'; // Single line textbox

    constructor(private formBuilder: FormBuilder) { }

    patchTemplateFormValues(dataTemplate: DataTemplate): FormGroup {
        const maxOrder = _.maxBy(dataTemplate.sections, function (o) { return o.order; });
        return this.formBuilder.group({
            id: new FormControl(dataTemplate.id),
            name: new FormControl(dataTemplate.name, Validators.required),
            codeName: new FormControl(dataTemplate.codeName),
            description: new FormControl(dataTemplate.description),
            icon: new FormControl(dataTemplate.icon),

            sections: this.formBuilder.array(dataTemplate.sections.map(x => new FormGroup({
                id: new FormControl(x.id),
                name: new FormControl(x.name),
                order: new FormControl(x.order),

                fields: this.formBuilder.array(
                    x.fields.map(field => new FormGroup({
                        id: new FormControl(field.id),
                        name: new FormControl(field.name),
                        codeName: new FormControl(field.codeName),
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
                                fieldId: new FormControl(fieldValidation.fieldId),
                                validationId: new FormControl(fieldValidation.validationId),
                                value: new FormControl(fieldValidation.value),
                                errorMessage: new FormControl(fieldValidation.errorMessage)
                            }))
                        )
                    })).concat([this.buildField()])
                )
            })).concat([this.buildSection(maxOrder == undefined ? 0 : maxOrder.order + 1)]))
        });
    }

    buildEmptyTemplateForm(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(Guid.EMPTY),
            name: new FormControl('', Validators.required),
            displayName: new FormControl(''),
            description: new FormControl(''),
            icon: new FormControl(''),
            sections: this.formBuilder.array([this.buildSection(0)]),
        });
    }

    buildSection(order: number): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(Guid.EMPTY),
            name: new FormControl(''),
            displayName: new FormControl(''),
            order: new FormControl(order),
            fields: this.formBuilder.array([this.buildField()]),
        });
    }

    buildField(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(Guid.EMPTY),
            name: new FormControl(''),
            displayName: new FormControl(''),
            description: new FormControl(''),
            defaultValue: new FormControl(''),
            isRequired: new FormControl(false),
            isIndexed: new FormControl(false),
            order: new FormControl(''),
            helpDescription: new FormControl(''),
            fieldTypeId: new FormControl(this.defaultControlId),
            fieldValidations: this.formBuilder.array([])
        });
    }
}
