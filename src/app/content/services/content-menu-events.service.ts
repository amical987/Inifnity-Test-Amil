import { Injectable } from '@angular/core';
import { ContentTreeApiService } from 'src/app/core';
import { OverlayService } from 'src/app/overlay/services';
import { OverlayYesNoComponent } from 'src/app/overlay/overlay-yes-no/overlay-yes-no.component';
import { OverlayContentTreeComponent } from 'src/app/overlay/overlay-content-tree/overlay-content-tree.component';
import { TreeNode } from 'src/app/field-types/models/tree-node';
import { ApiResponse } from 'src/app/core/models/api';
import { OverlayTemplateTreeComponent } from 'src/app/overlay/overlay-template-tree/overlay-template-tree.component';
import { Router } from '@angular/router';
import { TreeListOverlay } from 'src/app/overlay/models/tree-list-overlary';
import { TreeListServiceType } from 'src/app/field-types/models/tree-list-service-type.enum';

@Injectable()
export class ContentMenuEventsService {

    constructor(private router: Router, private contentTreeApiService: ContentTreeApiService, private overlayService: OverlayService) { }

    nodeMoved(id: string, parentId: string, nodeLevel: number): void {
        this.contentTreeApiService.move(id, parentId, nodeLevel).subscribe((prop: ApiResponse<any>) => {
        });
    }

    executeWorkflowCommand(treeId: string, lang: string, commandId: string): void {
        this.contentTreeApiService.executeWorkflowCommand(treeId, lang, commandId).subscribe((prop: ApiResponse<any>) => {
        });
    }

    delete(id: string): void {
        const dialogRef = this.overlayService.open<boolean>(OverlayYesNoComponent);

        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.contentTreeApiService.remove(id).subscribe((prop: ApiResponse<any>) => {
                });
            }
        });
    }

    copy(id: string): void {
        const treeListOverlay = new TreeListOverlay("Copy Content To", "Navigate to the location where you want to place your copy of the content.", TreeListServiceType.Content)
        const dialogRef = this.overlayService.open<TreeNode>(OverlayContentTreeComponent, { data: treeListOverlay });

        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.contentTreeApiService.copy(id, res.data.id).subscribe((prop: ApiResponse<any>) => {
                });
            }
        });
    }

    move(id: string): void {
        const treeListOverlay = new TreeListOverlay("Move Content To", "Navigate to the location where you want to move the content.", TreeListServiceType.Content)
        const dialogRef = this.overlayService.open<TreeNode>(OverlayContentTreeComponent, { data: treeListOverlay });

        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.nodeMoved(id, res.data.id, 0);
            }
        });
    }

    duplicate(id: string): void {
        // show popup
        this.contentTreeApiService.duplicate(id).subscribe((prop: ApiResponse<any>) => {
        });
    }

    insertFromTemplate(nodeId: string): void {
        const treeListOverlay = new TreeListOverlay("Insert from Data Template", "Select or search for the template you want to use. In the Item Name field, enter a name for the new item.", TreeListServiceType.DataTemplate)
        const dialogRef = this.overlayService.open<TreeNode>(OverlayContentTreeComponent, { data: treeListOverlay });

        // const dialogRef = this.overlayService.open<TreeNode>(OverlayTemplateTreeComponent);

        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                this.router.navigate([`/content/create/${res.data.id}/node/${nodeId}`]);
            }
        });
    }
}
