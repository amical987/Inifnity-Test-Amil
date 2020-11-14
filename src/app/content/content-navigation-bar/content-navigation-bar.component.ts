import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Overlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { OverlayService } from 'src/app/overlay/services';
import { ContentMenuEventsService } from '../services/content-menu-events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentTreeApiService } from 'src/app/core';
import _ from 'lodash';
import { Content, ContentCommand } from '..';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';
import { NewContentOverlayComponent } from '../new-content-overlay/new-content-overlay.component';

@Component({
    selector: 'app-content-navigation-bar',
    templateUrl: './content-navigation-bar.component.html',
    styleUrls: ['./content-navigation-bar.component.scss']
})
export class ContentNavigationBarComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    currentNodeId: string;
    nodeParentId: string;
    isEdit: boolean;
    insertMenu: TreeContextMenu[];
    content: Content;

    @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNewWithAnother: EventEmitter<any> = new EventEmitter<any>();
    @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('insertOrigin', { static: false }) insertOrigin: CdkOverlayOrigin;

    constructor(private route: ActivatedRoute, private router: Router, private contentMenuEventsService: ContentMenuEventsService, private overlayService: OverlayService, public overlay: Overlay, private contentTreeApi: ContentTreeApiService) { }

    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                this.currentNodeId = params.get('id');
                this.nodeParentId = params.get('parentId');
                this.isEdit = (this.nodeParentId == null);
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    new(): void {
        this.onNew.emit();
    }

    newWithAnother(): void {
        this.onNewWithAnother.emit();
    }

    update(): void {
        this.onUpdate.emit();
    }

    copy(): void {
        this.contentMenuEventsService.copy(this.currentNodeId);
    }

    move(): void {
        this.contentMenuEventsService.move(this.currentNodeId);
    }

    delete(): void {
        this.contentMenuEventsService.delete(this.currentNodeId);
    }

    duplicate(): void {
        this.contentMenuEventsService.duplicate(this.currentNodeId);
    }

    selectWorkflowCommand(contentCommand: ContentCommand): void {
        this.contentMenuEventsService.executeWorkflowCommand(this.currentNodeId, "en", contentCommand.id);
    }

    insertPanel(): void {
        const strategy = this.overlay.position()
            .connectedTo(this.insertOrigin.elementRef,
                { originX: 'start', originY: 'bottom' },
                { overlayX: 'start', overlayY: 'top' });

        const dialogRef = this.overlayService.open<TreeContextMenu>(NewContentOverlayComponent, { positionStrategy: strategy, backdropClass: '', data: this.currentNodeId });
        dialogRef.afterClosed$.subscribe(res => {
            if (res.data) {
                if (res.data.key == "insertfromtemplates") {
                    this.contentMenuEventsService.insertFromTemplate(this.currentNodeId);
                } else {
                    this.router.navigate([`/content/create/${res.data.actionId}/node/${this.currentNodeId}`]);
                }
            }
        });
    }
}
