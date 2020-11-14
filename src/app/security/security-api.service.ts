import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app-config";
import { BaseApiService } from '../core/services/base-api.service';
import { ApiResponse } from '../core/models/api/api-response';
import { ApiErrorResponse } from '../core/models/api/api-error-response';

import { Observable } from 'rxjs';

@Injectable()
export class SecurityApiService extends BaseApiService {
    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    resetPassword(email: string, bypassEmailConfirmation: boolean = false): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/reset-password`, { email: email, bypassEmailConfirmation: bypassEmailConfirmation });
    }

    verifyResetPasswordToken(token: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.post<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/change-password/token-verify`, {token :token});
    }

    changePasswordByToken(token: string, password: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/change-password`, { password: password, token: token });
    }

    confirmUserEmailByToken(token: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/confirm-email`, { token: token });
    }

    get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/user`;
    }
}
