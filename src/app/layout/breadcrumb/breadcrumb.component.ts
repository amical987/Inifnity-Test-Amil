import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { Breadcrumb } from './models/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  public breadcrumbs: any[];

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadCrumb(this.route.root);
  }
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  public buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    let label = "Home";

    if (route.routeConfig) {
      label = route.routeConfig.data ? route.routeConfig.data["title"] : 'Home';
    }

    const path = route.routeConfig ? route.routeConfig.path : '';
    const nextUrl = `${url}${path}/`;

    let newBreadcrumbs: any[] = [];

    if (path !== "" || label === "Home") {
      const breadcrumb = {
        label: label,
        url: nextUrl,
      };

      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    } else {
      newBreadcrumbs = [...breadcrumbs];
    }

    if (route.firstChild && route.firstChild.routeConfig.path !== path && route.firstChild.routeConfig.path !== "home") {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
