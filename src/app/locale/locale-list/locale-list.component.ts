import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/models/api/api-response';

import { LocaleApiService } from '../../core/services/locale-api.service';
import { Locale } from 'src/app/core/models/locale/locale.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-locale-list',
  templateUrl: './locale-list.component.html',
  styleUrls: ['./locale-list.component.scss']
})
export class LocaleListComponent implements OnInit {
  public dataSource: MatTableDataSource<Locale>;
  public displayedColumns: string[] = ['Language', 'Lcid', 'Region', 'FallbackLocale', 'Edit', 'Delete'];
  public locales: Locale[] = [];

  constructor(private localeApiService: LocaleApiService, private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getLocales();
    });

    this.getLocales();
  }

  public delete(locale: Locale): void {
    if (locale.lcid === 'en-us') {
      //TODO rease nortification
    } else {
      this.localeApiService.deleteLocale(locale.id).subscribe((prop: any) => {
        if (prop) {
          this.locales.splice(this.locales.findIndex((prop: any) => prop === locale), 1);

          this.dataSource = new MatTableDataSource<Locale>(this.locales);
        }
      });
    }
  }

  private getLocales(): void {
    this.localeApiService.getAll().subscribe((prop: ApiResponse<any>) => {
      this.locales = prop.records;

      this.dataSource = new MatTableDataSource<Locale>(this.locales);
    });
  }
}
