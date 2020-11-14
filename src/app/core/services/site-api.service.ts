import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app-config';
import { ApiErrorResponse } from '../models/api/api-error-response';
import { ApiResponse } from '../models/api/api-response';
import { Site } from '../models/site/site.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: "root",
})
export class SiteApiService extends BaseApiService {

  constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
    super(http, appConfig);

  }

  get baseUrl(): string {
    return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/site`;
  }

  public create(site: Site): Observable<ApiResponse<string> | ApiErrorResponse> {
    return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}`, site);
  }

  public deleteSite(siteId: string): Observable<ApiResponse<boolean> | ApiErrorResponse> {
    return this.delete<ApiResponse<boolean> | ApiErrorResponse>(`${this.baseUrl}/${siteId}`);
  }

  public getAll(): Observable<ApiResponse<Site[]> | ApiErrorResponse> {
    return this.get<ApiResponse<Site[]> | ApiErrorResponse>(`${this.baseUrl}`);
  }

  public getById(id: string): Observable<ApiResponse<Site> | ApiErrorResponse> {
    return this.get<ApiResponse<Site> | ApiErrorResponse>(`${this.baseUrl}/${id}`);
  }

  public update(site: Site): Observable<ApiResponse<boolean> | ApiErrorResponse> {
    return this.put<ApiResponse<boolean> | ApiErrorResponse>(`${this.baseUrl}`, site);
  }
}
