import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../app-config';
import { ApiErrorResponse } from '../../models/api/api-error-response';
import { ApiResponse } from '../../models/api/api-response';
import { BaseApiService } from '../base-api.service';
import { ITreeListApi } from '../interfaces/itree-list.api.service';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';

@Injectable({ providedIn: "root" })
export class ContentTreeApiService extends BaseApiService implements ITreeListApi {

    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    getNodes(): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<TreeNode[]> | ApiErrorResponse>(`${this.baseUrl}/content-tree`);
    }

    getChildren(parentId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<TreeNode[]> | ApiErrorResponse>(`${this.baseUrl}/content-tree/${parentId}`);
    }

    getMenuItems(itemId: string): Observable<ApiResponse<TreeContextMenu[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<TreeContextMenu[]> | ApiErrorResponse>(`${this.baseUrl}/content-menu/${itemId}`);
    }

    duplicate(id: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.post<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}/content-tree/duplicate`, { id: id });
    }

    copy(id: string, parentId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.post<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}/content-tree/copy`, { id: id, parentId: parentId });
    }

    move(id: string, parentId: string, nodeLevel: number): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.post<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}/content-tree/move-to`, { id: id, parentId: parentId, nodeLevel: nodeLevel });
    }

    remove(id: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.http.delete<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/content-tree/${id}`);
    }

    executeWorkflowCommand(contentTreeId: string, lang: string, commandId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.post<ApiResponse<any> | ApiErrorResponse>(`${this.baseUrl}/workflows/executecommand`, { contentTreeId: contentTreeId, lang: lang, commandId: commandId });
    }

    private get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}`;
    }
}
