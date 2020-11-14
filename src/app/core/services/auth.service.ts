import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwksValidationHandler, OAuthService } from "angular-oauth2-oidc";
import { AppConfig } from "../../app-config";
import { Claims } from "../models/constants/claims";
import { Constants } from "../models/constants/constants";
import { UserBase } from "../models/user/user-base";
import { UserManagementApiService } from './api/users-api.service';
import { LocaleStorageService } from '../utilities/storage/locale-storage.service';

@Injectable()
export class AuthService {
    constructor(
        private oauthService: OAuthService,
        private appConfig: AppConfig,
        private usersApiService: UserManagementApiService,
        private storageService: LocaleStorageService,
        private router: Router) {
        this.initOauthService();
    }

    public login(user: string, password: string): Promise<any> {
        return this.oauthService
            .fetchTokenUsingPasswordFlowAndLoadUserProfile(user, password)
            .then(user => {
                const userProfile = this.getUserProfile();
                return this.usersApiService
                    .getPermissionsByUserId(userProfile.id)
                    .toPromise();
            })
            .then((response) => {
                this.storageService.set(Constants.UserPermissionsStorageKey, JSON.stringify(response.records))
                return Promise.resolve(this.getUserProfile());
            });
    }

    public logOut(): void {
        this.oauthService.logOut(true);
        localStorage.removeItem(Constants.UserPermissionsStorageKey);
        this.router.navigate(["/authenticate/login"]);
    }

    public isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    public getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }

    public hasValidAccessToken(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    public authorizationHeader(): string {
        return this.oauthService.authorizationHeader();
    }

    public getIdentityClaims(): any {
        return this.oauthService.getIdentityClaims();
    }

    public getPermissions(): string[] {
        let permissionArray = [];
        const userPermissionsPayload = localStorage.getItem(Constants.UserPermissionsStorageKey);
        if (userPermissionsPayload) {
            const payload = JSON.parse(userPermissionsPayload);
            permissionArray = JSON.parse(payload) || [];
        }
        return permissionArray;
    }

    public updateClaims(user: UserBase) {
        const key = "id_token_claims_obj";
        const payload = localStorage.getItem(key);
        const claims = JSON.parse(payload);

        claims[Claims.FirstName] = user.firstName;
        claims[Claims.LastName] = user.lastName;
        claims[Claims.ProfilePhoto] = user.profilePhoto;
        claims[Claims.ProfilePhoto] = user.profilePhoto;
        claims[Claims.AccountStatus] = user.status;
        claims[Claims.PhoneNumber] = user.phoneNumber;

        localStorage.setItem(key, JSON.stringify(claims));
    }

    public getUserProfile(): UserBase {
        const claims = this.getIdentityClaims();
        const user =  {
            accountStatus: claims[Claims.AccountStatus],
            firstName: claims[Claims.FirstName],
            id: claims[Claims.UserId],
            lastName: claims[Claims.LastName],
            phoneNumber: claims[Claims.PhoneNumber],
            profilePhoto: claims[Claims.ProfilePhoto],
            username: claims[Claims.Username],
        } as UserBase;

        return user;
    }

    public initOauthService(): void {
        this.oauthService.setStorage(localStorage);
        this.oauthService.clientId = this.appConfig.appSettings.idp.clientId;
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.dummyClientSecret = this.appConfig.appSettings.idp.clientSecret;
        this.oauthService.scope = this.appConfig.appSettings.idp.scope;
        this.oauthService.oidc = false;
        this.oauthService.tokenEndpoint = `${this.appConfig.appSettings.idp.endpoint}/connect/token`;
        this.oauthService.userinfoEndpoint = `${this.appConfig.appSettings.idp.endpoint}/connect/userinfo`;
        this.oauthService.logoutUrl = `${this.appConfig.appSettings.idp.endpoint}/connect/endsession`;
    }
}
