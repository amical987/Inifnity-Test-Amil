import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfig } from "../../app-config";

export abstract class BaseApiService {
    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) { }

    protected get<TResponse>(url: string, headers?: HttpHeaders): Observable<TResponse> {
        return this.http.get<TResponse>(url, { headers });
    }

    protected post<TResponse>(
        url: string,
        body: any,
        headers?: HttpHeaders,
    ): Observable<TResponse> {
        return this.http.post<TResponse>(url, body, { headers });
    }

    protected put<TResponse>(
        url: string,
        body?: any,
        headers?: HttpHeaders,
    ): Observable<TResponse> {
        return this.http.put<TResponse>(url, body, { headers });
    }

    protected delete<TResponse>(
        url: string,
        headers?: HttpHeaders,
    ): Observable<TResponse> {
        return this.http.delete<TResponse>(url, { headers });
    }
}
