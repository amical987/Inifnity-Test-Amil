import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {
    constructor(private readonly router: Router) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event) => {},
                (error) => {
                    if (error.status === 401 || error.status === 403) {
                        this.router.navigate(["/errors/401"]);
                    }
                },
            ),
        );
    }
}
