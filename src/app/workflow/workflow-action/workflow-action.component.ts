import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { WorkflowAction } from '../models';
import { WorkflowApiService } from '../services/workflow-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/core';
import { debounceTime } from 'rxjs/operators';
import _ from 'lodash';

@Component({
    selector: 'app-workflow-action',
    templateUrl: './workflow-action.component.html',
    styleUrls: ['./workflow-action.component.scss']
})
export class WorkflowActionComponent implements OnInit {
    displayedColumns: string[] = ['name', 'displayName', 'assemblyType', 'iconClass', 'enabled', 'action'];
    workflowAction: MatTableDataSource<WorkflowAction> = new MatTableDataSource();
    showOverlay: boolean = false;
    actionForm: FormGroup;
    displayMessage: { [key: string]: string } = {};

    private validationMessages: { [key: string]: { [key: string]: string } } = {};
    private genericValidator: GenericValidator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private formBuilder: FormBuilder, private workflowApiService: WorkflowApiService) { }

    ngOnInit(): void {
        this.getAllActions();
        this.setFormValidation();
    }

    setFormValidation(): void {
        // TO DO - Get from settings
        this.validationMessages['name'] = {
            required: 'Name is required.'
        };
        this.validationMessages['displayName'] = {
            required: 'Display name is required.'
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    showActionForm(): void {
        this.displayMessage = {};
        this.showOverlay = true;
        this.actionForm = this.buildForm(null);

        this.actionForm.valueChanges.pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.actionForm);
        });
    }

    addAction(): void {
        if (this.actionForm.valid && this.actionForm.dirty) {
            const workflowAction = { ...this.actionForm.value } as WorkflowAction;
            if (workflowAction.id == '') {
                this.createWorkflowAction(workflowAction);
            } else {
                this.updateWorkflowAction(workflowAction);
            }
            this.showOverlay = false;
        } else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.actionForm);
        }
    }

    edit(workflowAction: WorkflowAction): void {
        this.showOverlay = true;
        this.actionForm = this.buildForm(workflowAction);
    }

    delete(workflowAction: WorkflowAction): void {
        this.workflowApiService.deleteAction(workflowAction.id).subscribe((prop: ApiResponse<any>) => {
            if (prop.records) {
                const index = _.findIndex(this.workflowAction.data, action => {
                    return action.id == workflowAction.id;
                });
                this.workflowAction.data.splice(index, 1);
                this.workflowAction._updateChangeSubscription();
            }
        });
    }

    getAllActions(): void {
        this.workflowApiService.getActions().subscribe((prop: ApiResponse<WorkflowAction[]>) => {
            this.workflowAction.data = prop.records;
            this.workflowAction.sort = this.sort;
        });
    }

    createWorkflowAction(workflowAction: WorkflowAction): void {
        this.workflowApiService.createAction(workflowAction).subscribe((prop: ApiResponse<any>) => {
            workflowAction.id = prop.records;
            this.workflowAction.data.push(workflowAction);
            this.workflowAction._updateChangeSubscription();
        });
    }

    updateWorkflowAction(workflowAction: WorkflowAction): void {
        this.workflowApiService.updateAction(workflowAction).subscribe((prop: ApiResponse<any>) => {
            const index = _.findIndex(this.workflowAction.data, action => {
                return action.id == workflowAction.id;
            });
            this.workflowAction.data.splice(index, 1, workflowAction);
            this.workflowAction._updateChangeSubscription();
        });
    }

    buildForm(workflowAction: WorkflowAction): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(workflowAction ? workflowAction.id : ''),
            name: new FormControl(workflowAction ? workflowAction.name : '', Validators.required),
            displayName: new FormControl(workflowAction ? workflowAction.displayName : '', Validators.required),
            assemblyType: new FormControl(workflowAction ? workflowAction.assemblyType : ''),
            iconClass: new FormControl(workflowAction ? workflowAction.iconClass : ''),
            enabled: new FormControl(workflowAction ? workflowAction.enabled : false)
        });
    }
}
