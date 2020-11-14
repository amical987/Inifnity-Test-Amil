import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config';

import { BaseApiService } from '..';
import { ApiErrorResponse } from '../../models/api/api-error-response';
import { ApiResponse } from '../../models/api/api-response';

@Injectable({
  providedIn: 'root',
})
export class RoleApiService extends BaseApiService {
//TODO use this service when backend have api to get roles for steps
  constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
    super(http, appConfig);
  }
//Add corect url when api is created
  get baseUrl(): string {
    return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/roles`;
  }

  public getAll(): Observable<ApiResponse<string[]> | ApiErrorResponse> {
    return this.get<ApiResponse<string[]> | ApiErrorResponse>(this.baseUrl);
  }
}
