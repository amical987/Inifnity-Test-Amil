import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeListService } from '../core';
import { Router } from '@angular/router';
import { TreeNodeMoved } from '../field-types/models/tree-node-moved';
import { MenuAction } from '../core/models/menus';
import { TreeNode } from '../field-types/models/tree-node';

@Component({
    selector: 'app-data-templates',
    templateUrl: './data-templates.component.html',
    styleUrls: ['./data-templates.component.scss']
})
export class DataTemplatesComponent {
    constructor(private treeListService: TreeListService, private router: Router) {
    }

    onNodeMove(nodeMoved: TreeNodeMoved): void {
        // this.contentMenuEventsService.nodeMoved(nodeMoved.id, nodeMoved.toParentId, nodeMoved.toIndex);
    }

    onSelect(node: TreeNode): void {
        this.router.navigate([`/data-template/design/${node.id}`])
    }

    onMenuSelect(menuAction: MenuAction): void {
        switch (menuAction.contentMenu.key) {
            case "insert":
                this.router.navigate([`/data-template/create/${menuAction.treeNode.id}`]);
                break;
            case "move":
                // this.dataTemplateApiService.(menuAction.treeNode.id);
                break;
            case "delete":
                // this.dataTemplateApiService.remove(menuAction.treeNode.id);
                break;
        }
    }
}
