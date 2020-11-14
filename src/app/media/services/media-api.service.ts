import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app-config';
import { ApiErrorResponse } from '../../core/models/api/api-error-response';
import { ApiResponse } from '../../core/models/api/api-response';
import { BaseApiService } from '../../core/services/base-api.service';
import { Media } from '../models/media.model';

@Injectable()
export class MediaApiService extends BaseApiService {

   constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
      super(http, appConfig);
   }

   get baseUrl(): string {
      return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/media`;
   }

   create(formData: FormData): Observable<ApiResponse<void> | ApiErrorResponse> {
      return this.http.post<ApiResponse<void> | ApiErrorResponse>(this.baseUrl, formData);
   }

   getById(mediaId: string): Observable<ApiResponse<Media> | ApiErrorResponse> {
      return this.http.get<ApiResponse<Media> | ApiErrorResponse>(`${this.baseUrl}/${mediaId}`);
   }

   getAll(): Observable<ApiResponse<Media[]> | ApiErrorResponse> {
      return this.http.get<ApiResponse<Media[]> | ApiErrorResponse>(this.baseUrl);
   }

   update(formData: FormData): Observable<ApiResponse<void> | ApiErrorResponse> {
      return this.http.put<ApiResponse<void> | ApiErrorResponse>(this.baseUrl, formData);
   }

   deleteMedia(id: string): Observable<ApiResponse<boolean> | ApiErrorResponse> {
      return this.http.delete<ApiResponse<boolean> | ApiErrorResponse>(`${this.baseUrl}/${id}`);
   }

   download(securityUrl: string) {
      return this.http.get(securityUrl, { responseType: "blob" });
   }
}
