import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config';
import { BaseApiService } from 'src/app/core';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { Locale } from '../models/locale/locale.model';


@Injectable({
  providedIn: 'root'
})
export class LocaleApiService extends BaseApiService {

  constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
    super(http, appConfig);
  }

  get baseUrl(): string {
    return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/locales`;
  }

  public create(Locale: Locale): Observable<ApiResponse<string> | ApiErrorResponse> {
    return this.post<ApiResponse<string> | ApiErrorResponse>(this.baseUrl, Locale);
  }

  public deleteLocale(localeId: string): Observable<ApiResponse<Locale> | ApiErrorResponse> {
    return this.delete<ApiResponse<Locale> | ApiErrorResponse>(`${this.baseUrl}/${localeId}`);
  }

  public getById(localeId: string): Observable<ApiResponse<Locale> | ApiErrorResponse> {
    return this.get<ApiResponse<Locale> | ApiErrorResponse>(`${this.baseUrl}/${localeId}`);
  }

  public getAll(): Observable<ApiResponse<Locale[]> | ApiErrorResponse> {
    return this.get<ApiResponse<Locale[]> | ApiErrorResponse>(this.baseUrl);
  }

  public update(locale: Locale): Observable<ApiResponse<void> | ApiErrorResponse> {
    return this.put<ApiResponse<void> | ApiErrorResponse>(this.baseUrl, locale);
  }
}
