import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app-config';
import { BaseApiService } from 'src/app/core';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { Culture } from '../models/culture';

@Injectable()
export class SettingsApiService extends BaseApiService {

  constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
    super(http, appConfig);
  }
  get baseUrl(): string {
    return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}`;
}

createCulture(culture: Culture): Observable<ApiResponse<string> | ApiErrorResponse> {
    return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/culture`, culture);
}

deleteCulture(CultureId: string): Observable<ApiResponse<void> | ApiErrorResponse> {
    return this.delete<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/culture/${CultureId}`);
}

updateCulture(culture: Culture): Observable<ApiResponse<void> | ApiErrorResponse> {
    return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/culture`, culture);
}

getCultures(): Observable<ApiResponse<Culture[]> | ApiErrorResponse> {
    return this.get<ApiResponse<Culture[]> | ApiErrorResponse>(`${this.baseUrl}/culture`);
}

}
