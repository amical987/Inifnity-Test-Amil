import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/field-types/models/tree-node';
import { ControlOverlayRef, TreeListOverlay } from '../models';

@Component({
    templateUrl: './overlay-content-tree.component.html',
    styleUrls: ['./overlay-content-tree.component.scss']
})
export class OverlayContentTreeComponent implements OnInit {
    treeApiName: string = "content";
    selectedNode: TreeNode;
    treeListOverlay: TreeListOverlay;
    constructor(public dialogRef: ControlOverlayRef) {
        this.treeListOverlay = dialogRef.data;
    }

    ngOnInit(): void {
    }

    onSelect(node: TreeNode): void {
        this.selectedNode = node;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    selectNode(): void {
        if (this.selectedNode) {
            this.dialogRef.close(this.selectedNode);
        }
    }
}
