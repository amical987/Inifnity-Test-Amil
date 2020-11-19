import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowsComponent } from './workflow.component';
import { HeaderComponent } from '../layout';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { AuthGuard } from '../core/guard';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowEditComponent } from './workflow-edit/workflow-edit.component';
import { WorkflowStepsComponent } from './workflow-steps/workflow-steps.component';
import { WorkflowActionComponent } from './workflow-action/workflow-action.component';
import { WorkflowScopesComponent } from './workflow-scopes/workflow-scopes.component';

const routes: Routes = [
    {
        path: '',
        component: WorkflowsComponent ,
        canActivate: [AuthGuard],
        data: { title: "Workflow" },
        children: [
            { path: '', component: WorkflowListComponent, data: { title: "List" }},
            { path: "create", component: WorkflowEditComponent, data: { title: "Workflow Create" } },
            { path: "edit/:id", component: WorkflowEditComponent, data: { title: "Workflow Edit" }, children: [
                { path: "", component: WorkflowStepsComponent, data: { title: "Workflow Steps" } }
            ] },
            { path: "actions", component: WorkflowActionComponent, data: { title: "Workflow Actions" } },
            { path: "edit/:id/scopes", component: WorkflowScopesComponent, data: { title: "Workflow Scopes" } }
        ]
    },
    { path: '', component: HeaderComponent, outlet: "header" },
    { path: '', component: SidebarComponent, outlet: "sidebar" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
