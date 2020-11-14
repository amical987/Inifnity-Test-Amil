import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ApiResponse } from '../../core/models/api/api-response';
import { Site } from '../../core/models/site/site.model';
import { SiteApiService } from '../../core/services/site-api.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: "app-site-list",
  templateUrl: "./site-list.component.html",
  styleUrls: ["./site-list.component.scss"],
})
export class SiteListComponent implements OnInit {
  public sites: Site[] = [];
  public dataSource: any;
  public displayedColumns: string[] = ['Name', 'Description', 'Domain name', 'Status', 'Edit', 'Delete'];

  constructor(private siteApiService: SiteApiService, private router: Router) { }

  public deleteSite(site: Site): void {
    this.siteApiService.deleteSite(site.id).subscribe((prop: ApiResponse<any>) => {
      if (prop.records) {
        this.sites.splice(this.sites.findIndex((siteFromArray: any) => siteFromArray === site), 1);

        this.dataSource = new MatTableDataSource<Site>(this.sites);
      }
    }, (response) => {
    });
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getSites();
    });

    this.getSites();
  }

  private getSites(): void {
    this.siteApiService.getAll().subscribe((prop: ApiResponse<any[]>) => {
      this.sites = prop.records;

      this.dataSource = new MatTableDataSource<Site>(this.sites);
    });
  }
}
