import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TreeListService, ContentTreeApiService } from '../core/services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuAction } from '../core/models/menus';
import { ContentMenuEventsService } from './services/content-menu-events.service';
import { TreeNodeMoved } from '../field-types/models/tree-node-moved';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {
    private selectedNodeSub: Subscription;

    constructor(private treeListService: TreeListService, private contentMenuEventsService: ContentMenuEventsService, private router: Router) {
    }

    ngOnInit(): void {
        this.selectedNodeSub = this.treeListService.selectedNodeChanges$.subscribe(selectedNode =>
            this.router.navigate([`/content/edit/${selectedNode.id}`])
        );
    }

    ngOnDestroy(): void {
        this.selectedNodeSub.unsubscribe();
    }

    onNodeMove(nodeMoved: TreeNodeMoved): void {
        this.contentMenuEventsService.nodeMoved(nodeMoved.id, nodeMoved.toParentId, nodeMoved.toIndex);
    }

    onMenuSelect(menuAction: MenuAction): void {
        switch (menuAction.contentMenu.key) {
            case "insert":
                this.router.navigate([`/content/create/${menuAction.treeNode.templateId}/node/${menuAction.treeNode.id}`]);
                break;
            case "insertfromtemplates":
                this.contentMenuEventsService.insertFromTemplate(menuAction.treeNode.id);
                break;
            case "copy":
                this.contentMenuEventsService.copy(menuAction.treeNode.id);
                break;
            case "duplicate":
                this.contentMenuEventsService.duplicate(menuAction.treeNode.id);
                break;
            case "move":
                this.contentMenuEventsService.move(menuAction.treeNode.id);
                break;
            case "delete":
                this.contentMenuEventsService.delete(menuAction.treeNode.id);
                break;
        }
    }
}

