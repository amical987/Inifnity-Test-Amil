import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTemplateApiService } from '../services/data-template-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignTemplateFormComponent } from '../design-template-form/design-template-form.component';
import { DataTemplate } from '../models';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { TreeListService, AlertNotificationService } from 'src/app/core';
import { TreeNode } from 'src/app/field-types/models/tree-node';
import { OverlayService } from 'src/app/overlay/services';
import { OverlayYesNoComponent } from 'src/app/overlay/overlay-yes-no/overlay-yes-no.component';

@Component({
    selector: 'app-data-template-design',
    templateUrl: './data-template-design.component.html'
})

export class DataTemplateDesignComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    private selectedNodeSub: Subscription;
    private id: string;
    private nodeParentId: string;
    private selectedNodeId: string;
    reorderFields: boolean = false;
    isEdit: boolean;

    @ViewChild(DesignTemplateFormComponent, { static: false }) public designTemplateForm: DesignTemplateFormComponent;

    constructor(private route: ActivatedRoute, private overlayService: OverlayService, private alertNotificationService: AlertNotificationService, private router: Router, private dataTemplateApiService: DataTemplateApiService, private treeListService: TreeListService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                this.nodeParentId = params.get('parentId');
                this.id = params.get('id');
                this.isEdit = !(this.id == null);
            }
        );

        this.selectedNodeSub = this.treeListService.lastSelectedNodeChanges$.subscribe(selectedNode => {
            if (selectedNode) {
                this.selectedNodeId = selectedNode.id
            }
        });
    }

    new(): void {
        this.router.navigate([`/data-template/create/${this.selectedNodeId}`])
    }

    delete(): void {
        const dialogRef = this.overlayService.open<boolean>(OverlayYesNoComponent);
        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.dataTemplateApiService.remove(this.id).subscribe((prop: ApiResponse<void>) => {
                    this.treeListService.deleteNode(this.id);
                    this.alertNotificationService.showSuccess();
                    this.router.navigate([`/data-template`])
                });
            }
        });
    }

    save(): void {
        if (this.designTemplateForm.isContentFormValid()) {
            const dataTemplate = this.designTemplateForm.getFormDataTemplate();
            if (this.isEdit) {
                this.updateForm(dataTemplate);
            } else {
                this.createNew(dataTemplate);
            }
        }
    }

    createNew(dataTemplate: DataTemplate): void {
        if (this.nodeParentId) {
            dataTemplate.parentId = this.nodeParentId;
        }
        this.designTemplateForm.busyIndicator.show();
        this.dataTemplateApiService.create(dataTemplate).subscribe((prop: ApiResponse<string>) => {
            this.treeListService.addNode(new TreeNode({ id: prop.records, name: dataTemplate.name, hasChildren: false, parentId: dataTemplate.parentId, icon: dataTemplate.icon, templateId:prop.records}));
            this.clearFormAfterSubmit();
            this.router.navigate([`/data-template/design/${prop.records}`])
        }, errorData => { this.designTemplateForm.errorPanel.serverErrors = errorData; this.designTemplateForm.busyIndicator.hide(); });
    }

    updateForm(dataTemplate: DataTemplate): void {
        this.designTemplateForm.busyIndicator.show();
        this.dataTemplateApiService.update(dataTemplate).subscribe((prop: ApiResponse<string>) => {
            this.clearFormAfterSubmit();
        }, errorData => this.designTemplateForm.errorPanel.serverErrors = errorData);
    }

    clearFormAfterSubmit(): void {
        this.alertNotificationService.showSuccess();
        this.designTemplateForm.busyIndicator.hide()
        this.designTemplateForm.templateDesignForm.markAsUntouched();
        this.designTemplateForm.templateDesignForm.markAsPristine();
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
        this.selectedNodeSub.unsubscribe();
    }

    reorderDone(): void {
        this.reorderFields = !this.reorderFields;
        this.designTemplateForm.reorderFields = this.reorderFields;
        this.designTemplateForm.addNewSection();
    }

    reorder(): void {
        this.reorderFields = !this.reorderFields;
        this.designTemplateForm.reorderFields = this.reorderFields;
    }
}
