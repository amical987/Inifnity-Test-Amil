import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { DataTemplate, DataTemplateInherited, UpdateDataTemplateInherited, ChildNodeTypes, UpdateChildNodeTypes } from '../models';
import { FieldTypes } from '../models/field-types';

@Injectable()
export class DataTemplateApiService extends BaseApiService {
    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/data-templates`;
    }

    getById(templateId: string): Observable<ApiResponse<DataTemplate> | ApiErrorResponse> {
        return this.http.get<ApiResponse<DataTemplate> | ApiErrorResponse>(
            `${this.baseUrl}/by-id/${templateId}`,
        );
    }

    save(dataTemplate: DataTemplate): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.http.post<ApiResponse<void>>(`${this.baseUrl}`, dataTemplate);
    }

    create(dataTemplate: DataTemplate): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.http.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}`, dataTemplate);
    }

    update(dataTemplate: DataTemplate): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.http.put<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}`, dataTemplate);
    }

    remove(id: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.delete<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/${id}`);
    }

    getInheritedTemplates(parentId: string): Observable<ApiResponse<DataTemplateInherited[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<DataTemplateInherited[]> | ApiErrorResponse>(`${this.baseUrl}/base-templates/${parentId}`);
    }

    updateInheritedTemplates(model: UpdateDataTemplateInherited): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.http.put<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/base-templates`, model);
    }

    getChildNodeTypes(parentId: string): Observable<ApiResponse<ChildNodeTypes[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<ChildNodeTypes[]> | ApiErrorResponse>(`${this.baseUrl}/child-data-templates/${parentId}`);
    }

    updateChildNodeTypes(model: UpdateChildNodeTypes): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.http.put<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/child-data-templates`, model);
    }

    getFieldTypes(): Observable<ApiResponse<FieldTypes[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<FieldTypes[]> | ApiErrorResponse>(`${this.baseUrl}/field-types/`);
    }
}
