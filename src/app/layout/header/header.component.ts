import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { LocaleStorageService } from 'src/app/core/utilities/storage/locale-storage.service';
import { UserInterfaceUtilityService } from 'src/app/core/utilities/user-interface-utility.service';
import { Preferences } from '../models/preferences.model';
import { UserManagementApiService as UsersApiService } from "../../core/services/api/users-api.service";
import { UserPreferenceClassManager, UserPreferences, Themes, SidebarLayout } from "../../core/models/user/user-preferences";
import { EventBusService } from 'src/app/core/events';
import { EmitEvent, Events } from 'src/app/core/models/events';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    userPreferenceClassManager: UserPreferenceClassManager = new UserPreferenceClassManager();
    userPreferences: UserPreferences = new UserPreferences();
    userPreferencePanel: boolean;
    preferences: Preferences;
    userId: string;
    showMenu: boolean = false;
    showFlyoutIcon: boolean = false;

    constructor(private utilityService: UserInterfaceUtilityService,
        private authService: AuthService, private userApiService: UsersApiService, private eventBusService: EventBusService) { }

    public ngOnInit(): void {
        const user = this.authService.getUserProfile();
        if (user.id) {
            this.userId = user.id;
        }
        this.setupUserPreferences();
    }

    menuIconClick(): void {
        this.showMenu = !this.showMenu;
        this.eventBusService.emit(new EmitEvent(Events.SidebarFlyoutSelected, this.showMenu));
    }

    setupUserPreferences(): void {
        this.userApiService.getUserPreferences(this.userId).then((userPreferences: UserPreferences) => {
            this.userPreferences = userPreferences;
            if (this.userPreferences === null) {
                this.userPreferences = new UserPreferences();
            } else {
                this.setupSelectedUserPreferenes();
            }
        });;
    }

    setupSelectedUserPreferenes(): void {
        if (this.userPreferences.theme != Themes.Default) {
            this.updateThemePreferences();
        }
        if (this.userPreferences.sidebarLayout != SidebarLayout.Docked) {
            this.setSidebar();
        }
        if (this.userPreferences.isSidebarCollapsed) {
            this.pusSidbarFlyoutCollapsed();
        }
    }

    pusSidbarFlyoutCollapsed(): void {
        this.eventBusService.emit(new EmitEvent(Events.SidebarFlyoutCollapsed, this.getPreferences()));
    }

    getPreferences(): Preferences {
        let preferences = new Preferences();
        preferences.userPreferences = this.userPreferences;
        preferences.userId = this.userId;
        return preferences;
    }

    updatePreferences(): void {
        const preferences = this.getPreferences();
        this.userApiService.updatePreferences(preferences);
    }

    updateSidebarSettings(): void {
        this.updatePreferences();
        this.setSidebar();
    }

    updateThemePreferences(): void {
        this.updatePreferences();
        this.changeTheme();
    }

    changeTheme(): void {
        const themeClass = this.userPreferenceClassManager.themesClasses[this.userPreferences.theme];
        const highContrastTheme = this.userPreferenceClassManager.themesContrast[this.userPreferences.highContrastTheme];

        this.userPreferenceClassManager.themesClasses.forEach(x =>
            this.utilityService.removeBodyClass(x));

        if (highContrastTheme != undefined && highContrastTheme != '') {
            this.utilityService.addBodyClass(highContrastTheme);
        } else {
            if (themeClass != undefined && themeClass != '') {
                this.userPreferenceClassManager.themesClassName[themeClass].forEach(x =>
                    this.utilityService.addBodyClass(x));
            } else {
                this.utilityService.addBodyClass(this.userPreferenceClassManager.themesClasses[0]);
            }
        }
    }

    setSidebar(): void {
        if (this.userPreferences.sidebarLayout == SidebarLayout.Flyout) {
            this.showFlyoutIcon = true;
            this.showMenu = true;
            this.eventBusService.emit(new EmitEvent(Events.SidebarFlyoutSelected, true));
        } else {
            this.showMenu = false;
            this.showFlyoutIcon = false;
            this.eventBusService.emit(new EmitEvent(Events.SidebarFlyoutSelected, false));
        }
    }
}
