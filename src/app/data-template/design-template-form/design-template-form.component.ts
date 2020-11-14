import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DataTemplate, Field } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTemplateApiService } from '../services/data-template-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import _ from 'lodash';
import { Icon } from 'src/app/shared/models/icon';
import { CodeNamePipe } from 'src/app/shared/pipes/code-name/code-name.pipe';
import { FieldTypes } from '../models/field-types';
import { OverlayService } from 'src/app/overlay/services';
import { OverlayFieldSettingsComponent } from '../overlay-field-settings/overlay-field-settings.component';
import { FormBuilderService } from '../services/form-builder.service';
import { ValidationAggregate } from 'src/app/core/utilities/form-validation';
import { BusyIndicator } from 'src/app/shared/models';
import { ErrorPanelComponent } from 'src/app/shared/components/error-panel/error-panel.component';
import { SiteIconsComponent } from 'src/app/overlay/site-icons/site-icons.component';

@Component({
    selector: 'app-design-template-form',
    templateUrl: './design-template-form.component.html',
    styleUrls: ['./design-template-form.component.scss'],
    providers: [CodeNamePipe]
})
export class DesignTemplateFormComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    templateDesignForm: FormGroup;
    fieldTypes: FieldTypes[] = [];
    currentTemplate: DataTemplate;
    reorderFields: boolean = false;
    isEdit: boolean = false;
    showInputCodeName: boolean = false;
    busyIndicator: BusyIndicator = new BusyIndicator();
    validation: ValidationAggregate = new ValidationAggregate();
    iconToShow: string = "folder";

    get sections(): FormArray {
        return this.templateDesignForm.get('sections') as FormArray;
    }

    @ViewChild(ErrorPanelComponent, { static: false }) public errorPanel: ErrorPanelComponent;

    constructor(private codeNamePipe: CodeNamePipe, private formBuilderService: FormBuilderService, private formBuilder: FormBuilder, private dataTemplateApiService: DataTemplateApiService, private overlayService: OverlayService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.dataTemplateApiService.getFieldTypes().subscribe((response: ApiResponse<FieldTypes[]>) => {
            this.fieldTypes = response.records;
        });

        this.routeSub = this.route.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.buildForm(id);
                this.isEdit = !(id == null);
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    onIconSelect(icon: Icon): void {
        this.templateDesignForm.patchValue({ icon: icon.class });
    }

    buildForm(id: string): void {
        if (id == null) {
            this.templateDesignForm = this.formBuilderService.buildEmptyTemplateForm();
        } else {
            this.buildEditForm(id);
        }
        this.setFormValidation();
    }

    setFormValidation(): void {
        this.validation.addValidationMessage('name', {
            required: 'Name is required.' // TO DO - Get from settings
        });

        this.validation.bindValueChangesWithValidator(this.templateDesignForm);
    }

    isContentFormValid(): boolean {
        if (this.templateDesignForm.valid && this.templateDesignForm.dirty) {
            return true;
        } else {
            this.validation.getValidationErrors(this.templateDesignForm, true);
            return false;
        }
    }

    getFormDataTemplate(): DataTemplate {
        let dataTemplate = { ...this.templateDesignForm.value } as DataTemplate;
        if (this.currentTemplate != undefined) {
            dataTemplate.parentId = this.currentTemplate.parentId;
            dataTemplate.nodeLevel = this.currentTemplate.nodeLevel;
        }

        if (dataTemplate.codeName == '') {
            dataTemplate.codeName = this.codeNamePipe.transform(dataTemplate.name);
        }

        // Remove empty sections
        _.remove(dataTemplate.sections, section => {
            return section.name == '' && section.fields.length == 1;
        });

        // Remove empty fields
        _.filter(dataTemplate.sections, o => {
            return !_.remove(o.fields, field => {
                return field.name == '';
            });
        });

        for (let index = 0; index < dataTemplate.sections.length; index++) {
            for (let indexField = 0; indexField < dataTemplate.sections[index].fields.length; indexField++) {
                dataTemplate.sections[index].fields[indexField].order = indexField;
            }
        }
        return dataTemplate;
    }

    buildEditForm(id: string): void {
        this.busyIndicator.show();
        this.dataTemplateApiService.getById(id).subscribe((prop: ApiResponse<DataTemplate>) => {
            this.currentTemplate = prop.records;
            this.templateDesignForm = this.formBuilderService.patchTemplateFormValues(prop.records);
            this.busyIndicator.hide();
        });
    }

    addField(section: FormArray, isLastField: boolean): void {
        if (isLastField) {
            (section.get('fields') as FormArray).push(this.formBuilderService.buildField());
        }
    }

    showFieldSettings(fieldFormGroup: FormGroup): void {
        const field = { ...fieldFormGroup.value } as Field;
        const dialogRef = this.overlayService.open<FormGroup>(OverlayFieldSettingsComponent, { data: field });
        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                const field = { ...res.data.value } as Field;
                fieldFormGroup.patchValue(res.data.value);
                (fieldFormGroup.get('fieldValidations') as FormArray).clear();
                field.fieldValidations.map(fieldValidation =>
                    (fieldFormGroup.get('fieldValidations') as FormArray).push(
                        new FormGroup({
                            id: new FormControl(fieldValidation.id),
                            fieldId: new FormControl(fieldValidation.fieldId),
                            validationId: new FormControl(fieldValidation.validationId),
                            value: new FormControl(fieldValidation.value),
                            errorMessage: new FormControl(fieldValidation.errorMessage)
                        })));

                this.templateDesignForm.markAsDirty();
            }
        });
    }

    removeField(section: FormArray, field: any): void {
        const fileds = (section.get('fields') as FormArray);
        fileds.removeAt(field);
        fileds.markAsDirty();
        if (fileds.length == 0) {
            fileds.push(this.formBuilderService.buildField());
        }
    }

    removeSection(index: any): void {
        this.sections.removeAt(index);
        this.sections.markAsDirty();
    }

    addNewSection(): void {
        const maxOrder = _.maxBy(this.sections.controls, function (o) { return o.get('order').value; }).get('order').value + 1;
        this.sections.push(this.formBuilderService.buildSection(maxOrder));
    }

    displayIconOverlay(): void {
        const dialogRef = this.overlayService.open<Icon>(SiteIconsComponent);
        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.iconToShow = res.data.name;
            }
        });
    }
}

