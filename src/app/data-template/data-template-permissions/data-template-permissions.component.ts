import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTemplate, ChildNodeTypes, UpdateChildNodeTypes } from '../models';
import { MultipleTreeListComponent } from 'src/app/field-types/list-types/multiple-tree-list/multiple-tree-list.component';
import { ActivatedRoute } from '@angular/router';
import { DataTemplateApiService } from '../services/data-template-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { BusyIndicator } from 'src/app/shared/models';
import { AlertNotificationService } from 'src/app/core';

@Component({
    selector: 'app-data-template-permissions',
    templateUrl: './data-template-permissions.component.html',
    styleUrls: ['./data-template-permissions.component.scss']
})
export class DataTemplatePermissionsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    currentTemplate: DataTemplate;
    busyIndicator: BusyIndicator = new BusyIndicator();
    @ViewChild(MultipleTreeListComponent, { static: false }) tree: MultipleTreeListComponent;

    constructor(private route: ActivatedRoute, private alertNotificationService: AlertNotificationService, private dataTemplateApiService: DataTemplateApiService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.getDataTemplate(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    getDataTemplate(id: string): void {
        this.busyIndicator.show();
        this.dataTemplateApiService.getById(id).subscribe((prop: ApiResponse<DataTemplate>) => {
            this.currentTemplate = prop.records;
            this.getChildNodeTypes();
        });
    }

    getChildNodeTypes(): void {
        this.dataTemplateApiService.getChildNodeTypes(this.currentTemplate.id).subscribe((prop: ApiResponse<ChildNodeTypes[]>) => {
            this.tree.initializeSelectedNodes(prop.records);
            this.busyIndicator.hide();
        });
    }

    save(): void {
        const model = new UpdateChildNodeTypes(this.currentTemplate.id, this.tree.getActiveIds());
        this.busyIndicator.show();
        this.dataTemplateApiService.updateChildNodeTypes(model).subscribe((prop: ApiResponse<string>) => {
            this.busyIndicator.hide();
            this.alertNotificationService.showSuccess();
        });
    }
}
