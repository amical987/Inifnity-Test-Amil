import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Locale } from 'src/app/core/models/locale/locale.model';
import { LocaleApiService } from 'src/app/core/services/locale-api.service';

import { ApiResponse } from '../../core/models/api/api-response';
import { Site } from '../../core/models/site/site.model';
import { SiteApiService } from '../../core/services/site-api.service';
import { UserInterfaceUtilityService } from '../../core/utilities/user-interface-utility.service';

@Component({
  selector: "app-create-site",
  templateUrl: "./site-create.component.html",
})
export class SiteCreateComponent implements OnInit {
  public locales: Locale[] = [];
  public selectedLocales: Locale[] = [];
  public site: Site = new Site();
  public siteForm: FormGroup;
  public validForm: boolean = true;

  constructor(private siteApiService: SiteApiService, private utlityService: UserInterfaceUtilityService,
    private router: Router, private localeApiService: LocaleApiService, private fb: FormBuilder) { }

  public createSiteForm(): FormGroup {
    return this.fb.group({
      displayName: ["", [Validators.required]],
      description: ["", [Validators.required]],
      domainName: [""],
      status: false,
      localeIds: [[], [Validators.required]]
    });
  }

  public ngOnInit(): void {
    this.localeApiService.getAll().subscribe((prop: ApiResponse<any>) => {
      this.locales = prop.records;
    });

    this.siteForm = this.createSiteForm();
  }

  public save(): void {
    if (!this.siteForm.valid) {
      this.validForm = false;
    } else {
      this.site = this.siteForm.value as Site;

      this.site.name = this.utlityService.getValidName(this.site.displayName);

      this.siteApiService.create(this.site).subscribe((prop: ApiResponse<any>) => {
        this.router.navigate([`site/edit/${prop.records}`]);
      });
    }
  }
}