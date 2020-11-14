import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { Locale } from 'src/app/core/models/locale/locale.model';

import { LocaleApiService } from '../../core/services/locale-api.service';
import { LocaleBottomSheetComponent } from '../locale-bottom-sheet/locale-bottom-sheet.component';

@Component({
  selector: 'app-locale-edit',
  templateUrl: './locale-edit.component.html',
})
export class LocaleEditComponent implements OnInit, OnDestroy {
  public locale: Locale = new Locale();
  public locales: Locale[] = [];
  public localeForm: FormGroup;
  public validForm: boolean = true;

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute, private localeApiService: LocaleApiService,
    private _bottomSheet: MatBottomSheet, private fb: FormBuilder) { }

  public createLocaleForm(): FormGroup {
    return this.fb.group({
      id: [this.locale.id],
      lcid: [this.locale.lcid, [Validators.required, Validators.maxLength(10)]],
      language: [this.locale.language, [Validators.required, Validators.maxLength(100)]],
      region: [this.locale.region, [Validators.required, Validators.maxLength(100)]],
      fallbackLocaleId: [this.locale.fallbackLocaleId],
    });
  }

  public edit(): void {
    if (!this.localeForm.valid) {
      this.validForm = false;
    } else {
      this.locale = this.localeForm.value as Locale;

      if (this.locales.find((prop: any) => prop.lcid === this.locale.lcid && prop.lcid !== this.locale.lcid)) {
        this._bottomSheet.open(LocaleBottomSheetComponent, {
          data: { message: "Language with that lcid exist" }
        });
      } else {
        this.localeApiService.update(this.locale).subscribe();
      }
    }
  }

  public ngOnInit(): void {
    this.routeSub = this.route.url.subscribe((url: any) => {
      this.localeApiService.getById(url[1].path).subscribe((prop: ApiResponse<any>) => {
        this.locale = prop.records;

        this.localeForm = this.createLocaleForm();

        this.getAllLocales();
      });
    });
  }

  public ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private getAllLocales(): void {
    this.localeApiService.getAll().subscribe((prop: ApiResponse<any>) => {
      this.locales = prop.records;
    });
  }
}
