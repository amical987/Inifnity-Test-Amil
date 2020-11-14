import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app-config';
import { ApiErrorResponse } from '../models/api/api-error-response';
import { ApiResponse } from '../models/api/api-response';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: "root",
})
export class IconsApiService extends BaseApiService {

  constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
    super(http, appConfig);

  }

  get baseUrl(): string {
    return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/icons`;
  }

  public getAll(): Observable<ApiResponse <any> | ApiErrorResponse>
  {
    return this.get<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}`);
  }

}
