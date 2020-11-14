import { Component, OnInit } from '@angular/core';
import { ControlOverlayRef } from 'src/app/overlay/models';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';
import { ContentTreeApiService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/models/api';
import _ from 'lodash';

@Component({
    selector: 'app-new-content-overlay',
    templateUrl: './new-content-overlay.component.html',
    styleUrls: ['./new-content-overlay.component.scss']
})
export class NewContentOverlayComponent implements OnInit {
    insertMenu: TreeContextMenu[];
    id: string;

    constructor(public dialogRef: ControlOverlayRef, private contentTreeApi: ContentTreeApiService) {
        this.id = this.dialogRef.data;
    }

    ngOnInit(): void {
        this.getInsertMenu(this.id);
    }

    getInsertMenu(id: string): void {
        this.contentTreeApi.getMenuItems(id).subscribe((prop: ApiResponse<TreeContextMenu[]>) => {
            const inserMenu = _.find(prop.records, menu => { return menu.key = 'insert'; }) as TreeContextMenu;
            if (inserMenu) {
                this.insertMenu = inserMenu.childActions;
            }
        });
    }

    selectMenu(menu: TreeContextMenu): void {
        this.dialogRef.close(menu);
    }
}
