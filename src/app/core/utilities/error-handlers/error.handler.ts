import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AppErrorHandler implements ErrorHandler {
    constructor() { }

    handleError(error: any) {
        //TODO: Need implement logger
        console.error(error);
    }
}