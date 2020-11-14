import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AppConfig {
    appSettings: {
        apiEndpoints: {
            cmsApi: {
                version: string;
                url: string
            };
        };
        idp: {
            clientId: string;
            clientSecret: string;
            scope: string;
            endpoint: string;
        };
    };
}
