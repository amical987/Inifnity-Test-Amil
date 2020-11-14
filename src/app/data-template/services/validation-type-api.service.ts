import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { ValidationTypes } from '../models';


@Injectable()
export class ValidationTypeApiService extends BaseApiService {
    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}`;
    }

    getValidationTypes(): Observable<ApiResponse<ValidationTypes[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<ValidationTypes[]> | ApiErrorResponse>(`${this.baseUrl}/validation/`);
    }
}
