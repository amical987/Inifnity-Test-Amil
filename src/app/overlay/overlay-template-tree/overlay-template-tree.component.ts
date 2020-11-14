import { Component, OnInit } from '@angular/core';
import { ControlOverlayRef } from '../models';
import { TreeNode } from 'src/app/field-types/models/tree-node';

@Component({
    templateUrl: './overlay-template-tree.component.html',
    styleUrls: ['./overlay-template-tree.component.scss']
})
export class OverlayTemplateTreeComponent implements OnInit {
    treeApiName: string = "templates";
    selectedNode: TreeNode;

    constructor(public dialogRef: ControlOverlayRef) { }

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
