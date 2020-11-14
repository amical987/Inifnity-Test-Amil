import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataTemplate, DataTemplateInherited, UpdateDataTemplateInherited } from '../models';
import { DataTemplateApiService } from '../services/data-template-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { MultipleTreeListComponent } from 'src/app/field-types/list-types/multiple-tree-list/multiple-tree-list.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BusyIndicator } from 'src/app/shared/models';
import { AlertNotificationService } from 'src/app/core';
import { ErrorPanelComponent } from 'src/app/shared/components/error-panel/error-panel.component';
import { ApiErrorResponse } from 'src/app/core/models/api';
import { ValidationAggregate } from 'src/app/core/utilities/form-validation';

@Component({
    selector: 'app-data-template-settings',
    templateUrl: './data-template-settings.component.html',
    styleUrls: ['./data-template-settings.component.scss']
})
export class DataTemplateSettingsComponent implements OnInit, OnDestroy, AfterViewInit {
    private routeSub: Subscription;
    currentTemplate: DataTemplate;
    settingsForm: FormGroup;
    busyIndicator: BusyIndicator = new BusyIndicator();
    editCodeName: boolean = false;
    validation: ValidationAggregate = new ValidationAggregate();
    icon: boolean = false;


    @ViewChild(ErrorPanelComponent, { static: false }) public errorPanel: ErrorPanelComponent;
    @ViewChild(MultipleTreeListComponent, { static: false }) tree: MultipleTreeListComponent;

    constructor(private formBuilder: FormBuilder, private alertNotificationService: AlertNotificationService, private route: ActivatedRoute, private dataTemplateApiService: DataTemplateApiService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.getDataTemplate(id);
            }
        );
    }

    setFormValidation(): void {
        this.validation.addValidationMessage('name', {
            required: 'Name is required.' // TO DO - Get from settings
        });

        this.validation.bindValueChangesWithValidator(this.settingsForm);
    }
    click(){
        this.icon = !this.icon;
      }

    getDataTemplate(id: string): void {
        this.busyIndicator.show();
        this.dataTemplateApiService.getById(id).subscribe((prop: ApiResponse<DataTemplate>) => {
            this.currentTemplate = prop.records;
            this.buildForms();
            this.setFormValidation();
            this.getInheritedTemplates();
            this.busyIndicator.hide();
        });
    }

    buildForms(): void {
        this.settingsForm = this.formBuilder.group({
            name: new FormControl(this.currentTemplate.name, Validators.required),
            codeName: new FormControl({ value: this.currentTemplate.codeName, disabled: this.editCodeName }),
            description: new FormControl(this.currentTemplate.description || ''),
            helpDescription: new FormControl(this.currentTemplate.helpDescription || ''),
            helpLongDescription: new FormControl(this.currentTemplate.helpLongDescription || '')
        });
    }

    save(): void {
        if (this.settingsForm.valid && this.settingsForm.dirty) {
            this.busyIndicator.show();
            forkJoin([this.updateTemplateSettings(), this.getInheritedTemplates()]).subscribe((response: any[]) => {
                this.alertNotificationService.showSuccess();
                this.busyIndicator.hide();
            }, errorData => { this.errorPanel.serverErrors = errorData[0]; this.busyIndicator.hide(); });
        } else {
            if (this.settingsForm.dirty) {
                this.validation.getValidationErrors(this.settingsForm, true);
            } else {
                this.updateInheritedTemplates().subscribe(() => {
                    this.alertNotificationService.showSuccess();
                    this.busyIndicator.hide();
                }, errorData => this.errorPanel.serverErrors = errorData);
            }
        }
    }

    updateTemplateSettings(): Observable<ApiResponse<string> | ApiErrorResponse> {
        this.currentTemplate.name = this.settingsForm.get('name').value;
        this.currentTemplate.codeName = this.settingsForm.get('codeName').value;
        this.currentTemplate.description = this.settingsForm.get('description').value;
        this.currentTemplate.helpDescription = this.settingsForm.get('helpDescription').value;
        this.currentTemplate.helpLongDescription = this.settingsForm.get('helpLongDescription').value;

        return this.dataTemplateApiService.update(this.currentTemplate);
    }

    updateInheritedTemplates(): Observable<ApiResponse<string> | ApiErrorResponse> {
        const ids = this.tree.getActiveIds();
        const model = new UpdateDataTemplateInherited(this.currentTemplate.id, this.tree.getActiveIds());
        return this.dataTemplateApiService.updateInheritedTemplates(model);
    }

    getInheritedTemplates(): void {
        this.dataTemplateApiService.getInheritedTemplates(this.currentTemplate.id).subscribe((prop: ApiResponse<DataTemplateInherited[]>) => {
            this.tree.initializeSelectedNodes(prop.records);
        });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // TO DO - Handle base templates
    }
}
