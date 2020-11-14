import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/api/api-response';

import { WorkflowApiService } from '../services/workflow-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workflow } from '../models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-workflow-list',
    templateUrl: './workflow-list.component.html',
    styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'displayName', 'action'];
    workflows: MatTableDataSource<Workflow> = new MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private workflowApiService: WorkflowApiService, private router: Router) { }

    ngOnInit(): void {
        this.workflowApiService.getAll().subscribe((prop: ApiResponse<Workflow[]>) => {
            this.workflows.data = prop.records;
            this.workflows.sort = this.sort;
        });
    }

    newWorkflow(): void {
        this.router.navigate([`workflow/create/`]);
        // this.workflowCreateComponent.showAddOverlay = true;
    }

    edit(workflow: Workflow): void {
        console.log(workflow);

    }

    delete(workflow: Workflow): void {
        console.log(workflow);
    }

    deleteWorkFlow(workflow: Workflow): void {
        this.workflowApiService.deleteWorkFlow(workflow.id).subscribe(
            (prop: ApiResponse<any>) => {
                if (prop.records) {
                    // this.workflows.splice(this.workflows.findIndex(prop => prop === workflow), 1);
                }
            });
    }
}
