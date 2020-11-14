import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppConfig } from '../../../app-config';
import { TreeNode } from '../../../field-types/models/tree-node';
import { ApiErrorResponse } from '../../models/api/api-error-response';
import { ApiResponse } from '../../models/api/api-response';
import { BaseApiService } from '../base-api.service';
import { ITreeListApi } from '../interfaces/itree-list.api.service';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';

@Injectable({ providedIn: "root" })
export class MediaTreeApiService extends BaseApiService implements ITreeListApi {

    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    getChildren(parentId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<TreeNode[]> | ApiErrorResponse>(`${this.baseUrl}/${parentId}`);
    }

    getNodes(): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse> {
        return this.http.get<ApiResponse<TreeNode[]> | ApiErrorResponse>(`${this.baseUrl}`);
    }

    getMenuItems(itemId: string): Observable<ApiResponse<TreeContextMenu[]> | ApiErrorResponse> {
        throw new Error("Method not implemented.");
    }

    private get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/media-tree-item`;
    }
}
