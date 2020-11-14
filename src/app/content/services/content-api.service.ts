import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { AppConfig } from 'src/app/app-config';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { Content } from '../models/content';

@Injectable()
export class ContentApiService extends BaseApiService {
    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    getByVersionId(versionId: string): Observable<ApiResponse<any> | ApiErrorResponse> {
        return this.http.get<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}/version/${versionId}`);
    }

    getByTemplateId(templateId: string): Observable<ApiResponse<Content> | ApiErrorResponse> {
        return this.http.get<ApiResponse<Content> | ApiErrorResponse>(`${this.baseUrl}/${templateId}/data-schema`);
    }

    getByNodeIdWithLang(lang: string, nodeId: string): Observable<ApiResponse<Content> | ApiErrorResponse> {
        return this.http.get<ApiResponse<Content> | ApiErrorResponse>(`${this.baseUrl}/${lang}/node/${nodeId}`);
    }

    create(newContent: Content): Observable<ApiResponse<any> | ApiErrorResponse> {
        return this.http.post<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}`, { TreeItemContent: newContent });
    }

    update(updatedContent: Content): Observable<ApiResponse<any> | ApiErrorResponse> {
        return this.http.put<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}`, { TreeItemContent: updatedContent });
    }

    private get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/content`;
    }
}
