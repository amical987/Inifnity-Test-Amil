import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';

import { LayoutService } from './../services/layout.service';
import { Sidebar } from './../models/sidebar.model';
import { EventBusService } from 'src/app/core/events';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/core/models/events';

@Component({
    selector: 'app-layout-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SidebarComponent implements OnInit, OnDestroy {
    public sidebarList: Sidebar[] = [];
    eventBusSub: Subscription;
    isMenuOpened: boolean;
    constructor(private layoutService: LayoutService, private eventBusService: EventBusService) { }

    showSidebarIcons(): void {
        this.isMenuOpened = !this.isMenuOpened;
    }

    ngOnInit() {
        this.eventBusSub = this.eventBusService.on(Events.SidebarFlyoutSelected, ((menuState: boolean) => {
            this.isMenuOpened = menuState;
        }));
        this.sidebarList = this.layoutService.getSidebars();
    }

    ngOnDestroy(): void {
        this.eventBusSub.unsubscribe();
    }
}
