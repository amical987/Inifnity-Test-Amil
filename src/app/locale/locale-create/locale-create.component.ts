import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { Locale } from 'src/app/core/models/locale/locale.model';

import { LocaleApiService } from '../../core/services/locale-api.service';
import { LocaleBottomSheetComponent } from '../locale-bottom-sheet/locale-bottom-sheet.component';

@Component({
  selector: 'app-locale-create',
  templateUrl: './locale-create.component.html',
})
export class LocaleCreateComponent implements OnInit {
  public locale: Locale = new Locale();
  public locales: Locale[] = [];
  public localeForm: FormGroup;
  public validForm: boolean = true;

  constructor(private localeApiService: LocaleApiService, private router: Router,
    private _bottomSheet: MatBottomSheet, private fb: FormBuilder) { }

  public createLocaleForm(): FormGroup {
    return this.fb.group({
      lcid: ["", [Validators.required, Validators.maxLength(10)]],
      language: ["", [Validators.required, Validators.maxLength(100)]],
      region: ["", [Validators.required, Validators.maxLength(100)]],
      fallbackLocaleId: [null],
    });
  }

  public ngOnInit(): void {
    this.localeApiService.getAll().subscribe((prop: ApiResponse<any>) => {
      this.locales = prop.records;
    });

    this.localeForm = this.createLocaleForm();
  }

  public save(): void {
    if (!this.localeForm.valid) {
      this.validForm = false;
    } else {
      this.locale = this.localeForm.value as Locale;

      if (this.locales.find((prop: any) => prop.lcid === this.locale.lcid)) {
        this._bottomSheet.open(LocaleBottomSheetComponent, {
          data: { message: "Language with that lcid exist" }
        });
      } else {
        this.localeApiService.create(this.locale).subscribe((prop: ApiResponse<any>) => {
          this.router.navigate([`locale/edit/${prop.records}`]);
        });
      }
    }
  }
}
