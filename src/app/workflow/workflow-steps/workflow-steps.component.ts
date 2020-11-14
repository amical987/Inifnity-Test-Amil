import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkflowStep, Step, WorkflowCommand, WorkflowStepAction, WorkflowAction } from '../models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from 'guid-typescript';
import { GenericValidator } from 'src/app/core';
import { debounceTime } from 'rxjs/operators';
import _ from 'lodash';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { WorkflowApiService } from '../services/workflow-api.service';

@Component({
    selector: 'app-workflow-steps',
    templateUrl: './workflow-steps.component.html',
    styleUrls: ['./workflow-steps.component.scss']
})
export class WorkflowStepsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    private validationMessages: { [key: string]: { [key: string]: string } } = {};
    private genericValidator: GenericValidator;

    wrokflowStepForm: FormGroup;
    stepForm: FormGroup;
    commandForm: FormGroup;
    actionForm: FormGroup;
    showStepOverlay: boolean = false;
    showCommandOverlay: boolean = false;
    showActionOverlay: boolean = false;
    workflowStep: WorkflowStep = new WorkflowStep();
    selectedStep: Step;
    selectedCommand: WorkflowCommand;
    selectedAction: WorkflowStepAction;
    displayMessage: { [key: string]: string } = {};
    workflowActions: WorkflowAction[];
    workflowId: string;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private workflowApiService: WorkflowApiService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                this.workflowId = params.get('id');
                this.getCurrentStep();
            }
        );
        this.setFormValidation();
        this.getAllActions();
    }

    getActionName(id: string): string {
        const actionName = _.find(this.workflowActions, action => { return action.id == id });
        if (actionName) {
            return actionName.name;
        }
        return '';
    }

    setFormValidation(): void {
        // TO DO - Get from settings
        this.validationMessages['name'] = {
            required: 'Name is required.'
        };
        this.validationMessages['displayName'] = {
            required: 'Display name is required.'
        };
        this.validationMessages['id'] = {
            required: 'Field is required.'
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    showStepForm(): void {
        this.displayMessage = {};
        this.showStepOverlay = true;
        this.stepForm = this.buildStepForm(null);

        this.stepForm.valueChanges.pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.stepForm);
        });
    }

    addStep(): void {
        if (this.stepForm.valid && this.stepForm.dirty) {
            this.showStepOverlay = false;
            const step = { ...this.stepForm.value } as Step;
            const stepIndex = _.findIndex(this.workflowStep.steps, obj => {
                return obj.id == step.id;
            });
            if (stepIndex == -1) {
                this.workflowStep.steps.push(step);
            } else {
                this.workflowStep.steps[stepIndex].name = step.name;
                this.workflowStep.steps[stepIndex].displayName = step.displayName;
                this.workflowStep.steps[stepIndex].iconClass = step.iconClass;
            }
        } else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.stepForm);
        }
    }

    selectStep(step: Step): void {
        this.showStepOverlay = true;
        this.stepForm = this.buildStepForm(step);
    }

    showCommandForm(step: Step): void {
        this.showCommandOverlay = true;
        this.selectedStep = step;
        this.selectedCommand = null;
        this.commandForm = this.buildCommand(null);
    }

    selectCommand(workflowCommand: WorkflowCommand): void {
        this.showCommandOverlay = true;
        this.selectedCommand = workflowCommand;
        this.commandForm = this.buildCommand(workflowCommand);
    }

    addCommand(): void {
        if (this.commandForm.valid && this.commandForm.dirty) {
            this.showCommandOverlay = false;
            const command = { ...this.commandForm.value } as WorkflowCommand;
            if (!this.selectedCommand) {
                this.selectedStep.commands.push(command);
            } else {
                this.selectedCommand.name = command.name;
                this.selectedCommand.displayName = command.displayName;
                this.selectedCommand.iconClass = command.iconClass;
                this.selectedCommand.nextStepId = command.nextStepId;
                this.selectedCommand.suppressComment = command.suppressComment;
            }
        }
        else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.commandForm);
        }
    }

    showActionForm(command: WorkflowCommand): void {
        this.showActionOverlay = true;
        this.selectedCommand = command;
        this.actionForm = this.buildAction(null);
    }

    selectAction(workflowStepAction: WorkflowStepAction): void {
        this.showActionOverlay = true;
        this.selectedAction = workflowStepAction;
        this.actionForm = this.buildAction(workflowStepAction);
    }

    addActionForm(): void {
        if (this.actionForm.valid && this.actionForm.dirty) {
            this.showActionOverlay = false;
            const action = { ...this.actionForm.value } as WorkflowStepAction;
            this.selectedCommand.actions.push(action);
        } else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.actionForm);
        }
    }

    deleteStep(index: number): void {
        this.workflowStep.steps.splice(index, 1);
    }

    deleteCommand(step: Step, index: number): void {
        step.commands.splice(index, 1);
    }

    deleteAction(command: WorkflowCommand, index: number): void {
        command.actions.splice(index, 1);
    }

    dropItem(event: CdkDragDrop<any[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    dropGroup(event: CdkDragDrop<any>): void {
        moveItemInArray(event.container.data.controls, event.previousIndex, event.currentIndex);
    }

    getAllActions(): void {
        this.workflowApiService.getActions().subscribe((prop: ApiResponse<WorkflowAction[]>) => {
            this.workflowActions = prop.records;
        });
    }

    buildStepForm(step: Step): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(step ? step.id : Guid.create().toString()),
            name: new FormControl(step ? step.name : '', Validators.required),
            displayName: new FormControl(step ? step.displayName : '', Validators.required),
            order: new FormControl(step ? step.order : ''),
            iconClass: new FormControl(step ? step.iconClass : ''),
            commands: this.formBuilder.array([])
        });
    }

    buildCommand(command: WorkflowCommand): FormGroup {
        return this.formBuilder.group({
            name: new FormControl(command ? command.name : '', Validators.required),
            displayName: new FormControl(command ? command.displayName : '', Validators.required),
            nextStepId: new FormControl(command ? command.nextStepId : ''),
            suppressComment: new FormControl(command ? command.suppressComment : false),
            order: new FormControl(command ? command.order : ''),
            iconClass: new FormControl(command ? command.iconClass : ''),
            actions: this.formBuilder.array([])
        });
    }

    buildAction(workflowAction: WorkflowStepAction): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(workflowAction ? workflowAction.id : '', Validators.required),
            order: new FormControl(workflowAction ? workflowAction.order : ''),
            executeIn: new FormControl(workflowAction ? workflowAction.executeIn : ''),
            nextStepId: new FormControl(workflowAction ? workflowAction.nextStepId : '')
        });
    }

    updateSteps(): void {
        this.setOrder();
        if (this.workflowStep.workflowId == '') {
            this.workflowStep.workflowId = this.workflowId;
            this.create();
        }else{
            this.update();
        }
    }

    setOrder(): void {
        for (let index = 0; index < this.workflowStep.steps.length; index++) {
            this.workflowStep.steps[index].order = +index;

            for (let commandIndex = 0; commandIndex < this.workflowStep.steps[index].commands.length; commandIndex++) {
                this.workflowStep.steps[index].commands[commandIndex].order = +commandIndex;
            }
        }
    }

    getCurrentStep(): void {
        this.workflowApiService.getStepByWorkflowId(this.workflowId).subscribe((prop: ApiResponse<WorkflowStep>) => {
            if (prop.records)
                this.workflowStep = prop.records;
        });
    }

    create(): void {
        this.workflowApiService.createStep(this.workflowStep).subscribe((prop: ApiResponse<any>) => {

        });
    }

    update(): void {
        this.workflowApiService.updateStep(this.workflowStep).subscribe((prop: ApiResponse<any>) => {

        });
    }
}
