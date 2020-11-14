import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AppConfig } from "../../app-config";

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient, private appConfig: AppConfig) { }

    public load(): Promise<AppConfig> {
        const appSettings = `settings/appsettings.json`;
        const promise = this.http.get<AppConfig>(appSettings).toPromise();

        promise.then((config) => {
            this.appConfig.appSettings = config.appSettings;
        });
        return promise;
    }
}
