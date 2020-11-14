import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Constants } from "../models/constants/constants";

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token =  localStorage.getItem(Constants.AccessTokenStorageKey);
        const header = `${Constants.AuthorizationHeaderPrefixKey} ${token}`;
        request = request.clone({
            setHeaders: {
                Authorization: header,
            },
        });
        return next.handle(request);
    }
}
