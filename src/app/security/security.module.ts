import { NgModule } from "@angular/core";
import { SecurityLoginComponent } from "./security-login/security-login.component";
import { SharedModule } from "../shared/shared.module";
import { SecurityRoutingModule } from "./security-routing.module";
import { SecurityLoginFormComponent } from "./security-login/security-login-form.component";
import { SecurityForgotPasswordComponent } from "./security-forgot-password/security-forgot-password.component";
import { SecurityApiService } from './security-api.service';
import { SecurityChangePasswordComponent } from './security-change-password/security-change-password.component';
import { SecurityEmailConfirmationComponent } from './security-email-confirmation/security-email-confirmation.component';

@NgModule({
    imports: [SecurityRoutingModule, SharedModule],
    declarations: [
        SecurityLoginComponent,
        SecurityLoginFormComponent,
        SecurityForgotPasswordComponent,
        SecurityChangePasswordComponent,
        SecurityEmailConfirmationComponent
    ],
    providers: [SecurityApiService]
})
export class SecurityModule {}
