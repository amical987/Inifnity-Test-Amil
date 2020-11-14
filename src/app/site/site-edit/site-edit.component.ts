import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Locale } from 'src/app/core/models/locale/locale.model';
import { LocaleApiService } from 'src/app/core/services/locale-api.service';

import { ApiResponse } from '../../core/models/api/api-response';
import { Site } from '../../core/models/site/site.model';
import { SiteApiService } from '../../core/services/site-api.service';
import { UserInterfaceUtilityService } from '../../core/utilities/user-interface-utility.service';

@Component({
  selector: "app-edit-site",
  templateUrl: "./site-edit.component.html",
})
export class SiteEditComponent implements OnInit, OnDestroy {
  public localeIds: string[] = [];
  public locales: Locale[] = [];
  public selectedLocales: Locale[] = [];
  public site: Site;
  public siteForm: FormGroup;
  public validForm: boolean = true;

  private routeUrlSub: Subscription;

  constructor(private route: ActivatedRoute, private siteApiService: SiteApiService,
    private utlityService: UserInterfaceUtilityService, private localeApiService: LocaleApiService, private fb: FormBuilder) { }

  public createSiteForm(): FormGroup {
    return this.fb.group({
      id: [this.site.id],
      displayName: [this.site.displayName, [Validators.required]],
      description: [this.site.description, [Validators.required]],
      domainName: this.site.domainName,
      status: this.site.status,
      localeIds: [this.site.localeIds, [Validators.required]]
    });
  }

  public edit(): void {
    if (!this.siteForm) {
      this.validForm = false;
    } else {
      this.site = this.siteForm.value as Site;

      this.site.name = this.utlityService.getValidName(this.site.displayName);

      this.siteApiService.update(this.site).subscribe();
    }
  }

  public ngOnInit(): void {
    this.routeUrlSub = this.route.url.subscribe((url) => {
      this.siteApiService.getById(url[1].path).subscribe((prop: ApiResponse<any>) => {
        this.site = prop.records;

        this.siteForm = this.createSiteForm();
      });
    });

    this.localeApiService.getAll().subscribe((prop: ApiResponse<any>) => {
      this.locales = prop.records;
    });
  }

  public ngOnDestroy(): void {
    this.routeUrlSub.unsubscribe();
  }
}
