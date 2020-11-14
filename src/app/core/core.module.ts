import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
    AuthService, TreeListService, ContentTreeApiService
} from './services';
import {
    AuthGuard,
    LoginGuard,
    PermissionGuard,
    ContentCreateEditGuard
} from './guard';
import { AppErrorHandler } from './utilities/error-handlers/error.handler';
import { HttpAuthorizationInterceptor } from './interceptors/http.authorization.interceptor';
import { HttpAppInterceptor } from './interceptors/http.app.interceptor';
import { TreeListApiFactory } from '.';
import { FormValidationFactory } from './factories/form-validation-factory';
import { ShowOnlyForPermissionsDirective } from "./security/show-only-for-permissons.directive";
import { AlertNotificationService } from './services/alert-notification.service';
import { OverlayModule } from '../overlay/overlay.module';
import { DataTemplateCreateEditGuard } from './guard/forms/data-template-create-edit-guard.service';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthorizationInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAppInterceptor,
            multi: true
        },
        AuthService, AuthGuard, PermissionGuard, LoginGuard, ContentCreateEditGuard, DataTemplateCreateEditGuard,
        TreeListService, ContentTreeApiService, TreeListApiFactory, FormValidationFactory, AlertNotificationService
    ],

    declarations: [ShowOnlyForPermissionsDirective],
    exports: [ShowOnlyForPermissionsDirective]
})
export class CoreModule { }
