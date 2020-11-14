export class UserPreferences {
    welcomePage: WelcomePage;
    sidebarLayout: SidebarLayout;
    theme: Themes;
    highContrastTheme: HighContastTheme;
    enablePopupNotifications: boolean;
    isSidebarCollapsed: boolean;

    constructor(options: {
        welcomePage?: WelcomePage,
        sidebarLayout?: SidebarLayout,
        theme?: Themes,
        highContrastTheme?: HighContastTheme,
        enablePopupNotifications?: boolean,
        isSidebarCollapsed?: boolean,
    } = {}) {
        this.welcomePage = options.welcomePage || WelcomePage.Home;
        this.sidebarLayout = options.sidebarLayout || SidebarLayout.Docked;
        this.theme = options.theme || Themes.Default;
        this.highContrastTheme = options.highContrastTheme || HighContastTheme.None;
        this.enablePopupNotifications = !!options.enablePopupNotifications;
        this.isSidebarCollapsed = !!options.isSidebarCollapsed;
    }
}

export class UserPreferenceClassManager {
    themesClasses: string[] = ["theme-light", "dark-header-theme", "light-header-theme", "theme-dark", "theme-white-high-contrast", "theme-black-high-contrast"];
    themesContrast: string[] = ["", "theme-white-high-contrast", "theme-black-high-contrast"];
    themesClassName: { [key: string]: string[] } = {
        "theme-light": ["theme-light"],
        "dark-header-theme": ["theme-light", "dark-header-theme"],
        "light-header-theme": ["theme-light", "light-header-theme"],
        "theme-dark": ["theme-dark"]
    };
}

export enum WelcomePage {
    Home = 0,
    Dashboard = 1
}

export enum SidebarLayout {
    Docked = 0,
    Flyout = 1
}

export enum Themes {
    Default = 0,
    LightHeaderTheme = 1,
    DarkTopNavigation = 2,
    Dark = 3
}

export enum HighContastTheme {
    None = 0,
    White = 1,
    Dark = 2
}
