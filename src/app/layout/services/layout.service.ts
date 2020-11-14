import { Injectable } from '@angular/core';

import { Sidebar } from './../models/sidebar.model';


@Injectable()
export class LayoutService {
    private sidebarList: Sidebar[] = [];

    constructor() {
        //TO DO: seed data
        this.sidebarList = [
            {
                name: "Home",
                link: "/home",
                "class": "icon-home",
                submenu: [
                    {
                        name: "Widgets",
                        link: "#",
                        "class": "icon-widgets",
                        submenu: []
                    },
                    {
                        name: "Placeholders",
                        link: "#",
                        "class": "icon-placeholders",
                        submenu: []
                    },
                    {
                        name: "Templates",
                        link: "#",
                        "class": "icon-templates",
                        submenu: []
                    },
                    {
                        name: "Dictionary",
                        link: "#",
                        "class": "icon-dictionary",
                        submenu: []
                    }
                ]
            },
            {
                name: "Content Editor",
                link: "/content",
                "class": "icon-content-editor",
                submenu: []
            },
            {
                name: "Media Library",
                link: "/media",
                "class": "icon-media-library",
                submenu: []
            },
            {
                name: "On-line Marketing",
                link: "#",
                "class": "icon-online-marketing",
                submenu: []
            },
            {
                name: "Web analytics",
                link: "#",
                "class": "icon-analytics",
                submenu: []
            },
            {
                name: "Development",
                link: "/data-template",
                "class": "icon-development",
                submenu: [
                    {
                        name: "Widgets",
                        link: "#",
                        "class": "icon-widgets",
                        submenu: []
                    },
                    {
                        name: "Placeholders",
                        link: "#",
                        "class": "icon-placeholders",
                        submenu: []
                    },
                    {
                        name: "Templates",
                        link: "#",
                        "class": "icon-templates",
                        submenu: []
                    },
                    {
                        name: "Dictionary",
                        link: "#",
                        "class": "icon-dictionary",
                        submenu: []
                    }
                ]
            },
            {
                name: "User Manager",
                link: "/user-management",
                "class": "icon-user-manager",
                submenu: []
            },
            {
                name: "Settings",
                link: "/settings",
                "class": "icon-settings",
                submenu: []
            }
        ]
    }


    public getSidebars(): Sidebar[] {
        return this.sidebarList;
    }
}
