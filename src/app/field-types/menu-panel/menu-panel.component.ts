import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material';
import { TreeContextMenu } from '../models/tree-context-menu';

@Component({
    selector: 'app-menu-panel',
    templateUrl: './menu-panel.component.html',
    styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit {
    contextMenuPosition = { x: '0px', y: '0px' };

    @ViewChild(MatMenuTrigger, { static: false }) menuTrigger: MatMenuTrigger;
    @ViewChild("menu", { static: true }) menu: MatMenu;
    @Input() items: TreeContextMenu[];
    @Output() onSelectMenuAction: EventEmitter<TreeContextMenu> = new EventEmitter<TreeContextMenu>();

    constructor() { }

    ngOnInit(): void {

    }

    showMenu(event: MouseEvent): void {
        this.contextMenuPosition.x = event.clientX + 'px';
        this.contextMenuPosition.y = event.clientY + 'px';
        this.menuTrigger.openMenu();
    }

    onSelectMenu(item: TreeContextMenu): void {
        this.onSelectMenuAction.emit(item);
    }
}
