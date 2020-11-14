import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Workflow } from '../models';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { WorkflowApiService } from '../services/workflow-api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workflow-edit',
    templateUrl: './workflow-edit.component.html',
    styleUrls: ['./workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class WorkflowEditComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    workflowId: string;
    workflowForm: FormGroup;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private workflowApiService: WorkflowApiService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                if (params.keys.length > 0) {
                    this.workflowId = params.get('id');
                    this.getWorkflow();
                }
                else {
                    this.workflowForm = this.buildForm();
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    buildForm(): FormGroup {
        return this.formBuilder.group({
            name: new FormControl(''),
            displayName: new FormControl(''),
            useCheckInCheckOut: new FormControl(false),
            enabled: new FormControl(false)
        });
    }

    getWorkflow(): void {
        this.workflowApiService.getById(this.workflowId).subscribe((prop: ApiResponse<Workflow>) => {
            this.workflowForm = this.formBuilder.group({
                name: new FormControl(prop.records.name),
                displayName: new FormControl(prop.records.displayName),
                useCheckInCheckOut: new FormControl(prop.records.useCheckInCheckOut),
                enabled: new FormControl(prop.records.enabled)
            });
        });
    }

    update(): void {
        const workflow = { ...this.workflowForm.value } as Workflow;
        workflow.id = this.workflowId;
        this.workflowApiService.update(workflow).subscribe((prop: ApiResponse<any>) => {
            this.router.navigate([`workflow/edit/${prop.records}`]);
        });
    }

    save(): void {
        const workflow = { ...this.workflowForm.value } as Workflow;
        this.workflowApiService.create(workflow).subscribe((prop: ApiResponse<string>) => {
            this.router.navigate([`workflow/edit/${prop.records}`]);
        });
    }
}
