import { Component, ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import { TreeListComponent } from '../../tree-list/tree-list.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import _ from 'lodash';
import { TreeNode } from '../../models/tree-node';

@Component({
    selector: 'app-multiple-tree-list',
    templateUrl: './multiple-tree-list.component.html',
    styleUrls: ['./multiple-tree-list.component.scss']
})
export class MultipleTreeListComponent implements OnInit, AfterViewInit {
    formTreeList: FormGroup;
    nodes = [];
    selectedNodes: TreeNode[] = [];

    private get formNodes(): FormArray {
        return this.formTreeList.get('nodes') as FormArray;
    }

    @Input() public treeApiName: string;
    @ViewChild(TreeListComponent, { static: false }) tree: TreeListComponent;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.formTreeList = this.formBuilder.group({
            nodes: new FormArray([])
        });
    }

    ngAfterViewInit(): void {
        if (this.tree) {
            this.nodes = this.tree.tree.treeModel.nodes;
        }
    }

    private setupForm(): void {
        this.formTreeList = this.formBuilder.group({
            nodes: new FormArray([])
        });
    }

    private populateNodes(): void {
        this.selectedNodes.forEach((o, i) => {
            this.formNodes.push(new FormControl(false));
        });
    }

    private getSelectedNodes(): string[] {
        return this.formTreeList.value.nodes
            .map((v, i) => (v ? this.selectedNodes[i].id : null))
            .filter(v => v !== null) as string[];
    }

    moveToListDoubleClick(node: any): void {
        this.addToList(node);
    }

    moveToList(): void {
        this.addToList(this.tree.getActiveNode());
    }

    addToList(selectedNode: any): void {
        const val = _.some(this.selectedNodes, (node) => { return selectedNode.id == node.id });
        if (!val) {
            this.selectedNodes.push(selectedNode.data);
            this.formNodes.push(new FormControl(false));
        }
    }

    removeFromList(): void {
        const selectedNodeIds = this.getSelectedNodes();

        selectedNodeIds.forEach((val) => {
            const index = _.findIndex(this.selectedNodes, (tempNode) => { return tempNode.id == val });
            if (index != -1) {
                this.formNodes.removeAt(index);
                this.selectedNodes.splice(index, 1);
            }
        });
    }

    initializeSelectedNodes(selectedNodes: any): void {
        this.selectedNodes = selectedNodes;
        this.populateNodes();
    }

    getActiveIds(): string[] {
        return _.map(this.selectedNodes, 'id');
    }
}
