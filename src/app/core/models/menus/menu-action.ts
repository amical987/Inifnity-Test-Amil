import { TreeNode } from 'src/app/field-types/models/tree-node';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';

export class MenuAction {
    contentMenu: TreeContextMenu;
    treeNode: TreeNode;
    constructor(contentMenu: TreeContextMenu, treeNode: TreeNode){
        this.contentMenu = contentMenu;
        this.treeNode = treeNode;
    }
}
