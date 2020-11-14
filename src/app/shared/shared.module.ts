import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';

import { FallbackImageDirective, ImageComponent } from '.';
import { AuthService } from '../core/services/auth.service';
import { BusyIndicatorDirective } from './directives/busy-indicator/busy-indicator.directive';
import { CmsIcon } from './components/cms-icon/cms-icon.component';
import { SentenceCaseTextPipe } from './pipes/sentance-text/sentence-case-text.pipe';
import { TextTrimComponent } from './components/text-trim/text-trim.component';
import { CodeNamePipe } from './pipes/code-name/code-name.pipe';
import { TextboxLockComponent } from './components/textbox-lock/textbox-lock.component';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, // remove after refactoring
        ReactiveFormsModule,
        OAuthModule.forRoot()
    ],
    declarations: [
        FallbackImageDirective,
        ImageComponent,
        BusyIndicatorDirective,
        TextTrimComponent,
        SentenceCaseTextPipe,
        CmsIcon,
        CodeNamePipe,
        TextboxLockComponent,
        ErrorPanelComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OAuthModule,
        BusyIndicatorDirective,
        FallbackImageDirective,
        ImageComponent,
        TextTrimComponent,
        SentenceCaseTextPipe,
        CmsIcon,
        CodeNamePipe,
        TextboxLockComponent,
        ErrorPanelComponent
    ],
    providers: [
        AuthService,
        CookieService
    ]
})
export class SharedModule {}
