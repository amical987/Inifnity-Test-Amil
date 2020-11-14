import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from './core/events';
import { Events } from './core/models/events';
import { Preferences } from './layout/models/preferences.model';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    sidebarFlyoutSub: Subscription;
    SidebarFlyoutCollapsedSub: Subscription;
    isMenuOpened: boolean;
    preferences: Preferences;
    constructor(private eventBusService: EventBusService) { }

    ngOnInit(): void {
        this.sidebarFlyoutSub = this.eventBusService.on(Events.SidebarFlyoutSelected, ((menuState: boolean) => {
            this.isMenuOpened = menuState;
        }));

        this.SidebarFlyoutCollapsedSub = this.eventBusService.on(Events.SidebarFlyoutCollapsed, ((preferences: Preferences) => {
            this.preferences = preferences;
        }));
    }

    ngOnDestroy(): void {
        this.sidebarFlyoutSub.unsubscribe();
        this.SidebarFlyoutCollapsedSub.unsubscribe();
    }
}
