import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowsRoutingModule } from './workflow-routing.module';
import { WorkflowsComponent } from './workflow.component';
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowApiService } from './services/workflow-api.service';
import { LayoutModule } from '../layout/layout.module';
import { WorkflowEditComponent } from './workflow-edit/workflow-edit.component';
import { WorkflowNavigationComponent } from './workflow-navigation/workflow-navigation.component';
import { WorkflowStepsComponent } from './workflow-steps/workflow-steps.component';
import { WorkflowActionComponent } from './workflow-action/workflow-action.component';
import { WorkflowEditNavigationComponent } from './workflow-edit-navigation/workflow-edit-navigation.component';
import { WorkflowScopesComponent } from './workflow-scopes/workflow-scopes.component';
import { FieldTypesModule } from '../field-types/field-types.module';
import { SharedModule } from '../shared/shared.module';
import { OverlayModule } from '../overlay/overlay.module';


@NgModule({
    declarations: [WorkflowsComponent, WorkflowListComponent, WorkflowEditComponent, WorkflowNavigationComponent, WorkflowStepsComponent, WorkflowActionComponent, WorkflowEditNavigationComponent, WorkflowScopesComponent],
    imports: [
        CommonModule,
        WorkflowsRoutingModule,
        LayoutModule,
        MaterialCustomModule,
        ReactiveFormsModule,
        FieldTypesModule,
        SharedModule,
        OverlayModule
    ],
    providers: [
        WorkflowApiService
    ]
})
export class WorkflowModule { }
