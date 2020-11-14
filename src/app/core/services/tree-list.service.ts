import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TreeNode } from '../../field-types/models/tree-node';
import { ApiErrorResponse } from '../models/api/api-error-response';
import { ApiResponse } from '../models/api/api-response';
import { ITreeListApi } from './interfaces/itree-list.api.service';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';

@Injectable()
export class TreeListService {
    private selectedNodeSource = new Subject<TreeNode>();
    private deleteNodeSource = new Subject<string>();
    private selectedNodeBehavior = new BehaviorSubject<TreeNode>(null);
    private newNodeSource = new Subject<TreeNode>();

    treeListApi: ITreeListApi;
    selectedNodeChanges$ = this.selectedNodeSource.asObservable();
    lastSelectedNodeChanges$ = this.selectedNodeBehavior.asObservable();
    newNode$ = this.newNodeSource.asObservable();
    deleteNode$ = this.deleteNodeSource.asObservable();

    constructor() {
    }

    deleteNode(nodeId: string): void {
        this.deleteNodeSource.next(nodeId);
    }

    addNode(node: TreeNode): void {
        this.newNodeSource.next(node);
    }

    selectedNode(node: TreeNode): void {
        this.selectedNodeSource.next(node);
        this.selectedNodeBehavior.next(node);
    }

    getMenuItems(itemId: string): Observable<ApiResponse<TreeContextMenu[]> | ApiErrorResponse> {
        return this.treeListApi.getMenuItems(itemId);
    }

    getNodes(): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.treeListApi.getNodes();
    }

    getChildren(parentId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.treeListApi.getChildren(parentId);
    }
}
