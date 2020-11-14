import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from "../base-api.service";
import { AppConfig } from "../../../app-config";
import { UserBase } from "../../models/user/user-base";
import { ApiResponse } from "../../models/api/api-response";
import { Preferences } from "../../../layout/models/preferences.model";
import { ApiErrorResponse } from "../../models/api/api-error-response";
import { UserPreferences } from "../../models/user/user-preferences";
import { LocaleStorageService } from '../../utilities/storage/locale-storage.service';

@Injectable({ providedIn: "root" })
export class UserManagementApiService extends BaseApiService {
    private storageKey = 'userPreferences';
    constructor(http: HttpClient, private localeStorageService: LocaleStorageService, appConfig: AppConfig) {
        super(http, appConfig);
    }

    updateUserBasicInformationById(user: UserBase): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/${user.id}/basic-information`, user);
    }

    updateUserAccountStatus(user: UserBase): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/${user.id}/status`, user);
    }

    getUserById(userId: string): Observable<ApiResponse<UserBase>> {
        return this.get<ApiResponse<UserBase>>(`${this.baseUrl}/${userId}`);
    }

    getPermissionsByUserId(userId: string): Observable<ApiResponse<string[]>> {
        return this.get<ApiResponse<string[]>>(`${this.baseUrl}/${userId}/permissions`);
    }

    searchUsers(keyword: string, page: number, pageSize: number): Observable<ApiResponse<UserBase[]>> {
        return this.get<ApiResponse<UserBase[]>>(`${this.baseUrl}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
    }

    deleteAccount(user: UserBase):  Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.delete<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/${user.id}`);
    }

    createAccount(user: UserBase):  Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}`, { firstName: user.firstName, lastName: user.lastName, email: user.username, phoneNumber: user.phoneNumber });
    }

    get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}/users`;
    }

    private update(userPreferences: Preferences): Observable<ApiResponse<boolean> | ApiErrorResponse> {
        return this.http.put<ApiResponse<boolean> | ApiErrorResponse>(`${this.baseUrl}/user-preferences`, userPreferences);
    }

    private getByUserId(userId: string): Observable<ApiResponse<UserPreferences> | ApiErrorResponse> {
        return this.http.get<ApiResponse<UserPreferences> | ApiErrorResponse>(`${this.baseUrl}/${userId}/user-preferences`);
    }

    async getUserPreferences(userId: string): Promise<UserPreferences> {
        const userPreferences = this.localeStorageService.get(this.storageKey) as UserPreferences;

        if (userPreferences === null) {
            return await this.getByUserId(userId).toPromise().then((prop: ApiResponse<UserPreferences>) => {
                return prop.records;
            });
        }
        return userPreferences;
    }

    updatePreferences(preferences: Preferences): void {
        this.localeStorageService.set(this.storageKey, preferences.userPreferences);
        this.update(preferences).subscribe();
    }
}
