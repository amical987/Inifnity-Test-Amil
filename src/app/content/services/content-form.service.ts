import { Injectable } from "@angular/core";
import { Content, SectionField, ControlField } from '..';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionFormGroup } from 'src/app/field-types';
import { FieldMappingFactory } from 'src/app/field-types/factories/field-mapping.service';
import { FormValidationFactory } from 'src/app/core/factories/form-validation-factory';

@Injectable()
export class ContentFormService {

    constructor(private fieldMappingFactory: FieldMappingFactory, private formValidationFactory: FormValidationFactory) {
    }

    getSectionsWithFromGroupFromContent(content: Content): SectionFormGroup {
        let contentSections: SectionField[] = [];
        let group: any = {};
        let validationMessages: any = {};

        content.tables.forEach(table => {
            table.sections.forEach(section => {
                // debugger;
                let sectionField = new SectionField(section.name);
                section.fields.forEach(field => {
                    //  debugger;
                    let controlField = new ControlField(table.tableName, field);
                    controlField.control = this.fieldMappingFactory.getControl(table.tableName, field);

                    const validationRules = this.formValidationFactory.getValidators(field.validations);
                    if (validationRules.validators.length > 0) {
                        // group[controlField.control.key] = new FormControl(controlField.control.value || '', validationRules.validators);
                        // validationMessages[controlField.control.key] = validationRules.messages;
                        group[controlField.control.key] = new FormControl(controlField.control.value || '');
                        // Temp
                    } else {
                        group[controlField.control.key] = new FormControl(controlField.control.value || '');
                    }
                    sectionField.controlFields.push(controlField);
                });

                contentSections.push(sectionField);
            });
        });

        return new SectionFormGroup({ formGroup: new FormGroup(group), sections: contentSections, validationMessages: validationMessages });
    }

    getNewContent(contentFormGroup: FormGroup, content: Content): Content {
        content.tables.forEach(table => {
            table.sections.forEach(section => {
                section.fields.forEach(field => {
                    let keyControl = `${table.tableName}${field.name}`;
                    field.value = contentFormGroup.controls[keyControl].value;
                });
            });
        });

        return content;
    }

    getModifiedContent(contentFormGroup: FormGroup, content: Content): Content {
        let contentDbChanges = false;
        let contentUpdates = new Content();

        content.tables.forEach(table => {
            contentDbChanges = false;
            table.sections.forEach(section => {
                section.fields.forEach(field => {
                    let keyControl = `${table.tableName}${field.name}`;
                    if (contentFormGroup.controls[keyControl].dirty && contentFormGroup.controls[keyControl].value != field.value) {
                        field.value = contentFormGroup.controls[keyControl].value;
                        contentDbChanges = true;
                    }
                });
            });

            if (contentDbChanges) {
                contentUpdates.tables.push(table);
            }
        });

        return contentUpdates;
    }
}
