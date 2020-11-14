import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultipleTreeListComponent } from 'src/app/field-types/list-types/multiple-tree-list/multiple-tree-list.component';
import { ActivatedRoute } from '@angular/router';
import { WorkflowScope, Scope } from '../models';
import { WorkflowApiService } from '../services/workflow-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { TreeNode } from 'src/app/field-types/models/tree-node';
import _ from 'lodash';

@Component({
    selector: 'app-workflow-scopes',
    templateUrl: './workflow-scopes.component.html',
    styleUrls: ['./workflow-scopes.component.scss']
})
export class WorkflowScopesComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    workflowScope: WorkflowScope;

    @ViewChild(MultipleTreeListComponent, { static: false }) tree: MultipleTreeListComponent;

    constructor(private route: ActivatedRoute, private workflowApiService: WorkflowApiService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.getScopes(id);
            }
        );
    }

    getScopes(id: string): void {
        this.workflowApiService.getScopes(id).subscribe((prop: ApiResponse<WorkflowScope>) => {
            this.workflowScope = prop.records;
            if (this.workflowScope.workflowScopes.length > 0) {
                const nodes = _.map(this.workflowScope.workflowScopes, x => new TreeNode({ name: x.dataTemplateName, id: x.dataTemplateId }));
                this.tree.initializeSelectedNodes(nodes);
            }
        });
    }

    update(): void {
        const ids = this.tree.getActiveIds();
        ids.forEach(id => this.workflowScope.workflowScopes.push(new Scope(id)));

        this.workflowApiService.updateScope(this.workflowScope).subscribe((prop: ApiResponse<any>) => {

        });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
