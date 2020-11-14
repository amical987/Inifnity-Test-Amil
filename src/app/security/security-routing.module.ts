import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SecurityLoginComponent } from './security-login/security-login.component';
import { LoginGuard } from '../core/guard/login-guard.service';
import { SecurityLoginFormComponent } from './security-login/security-login-form.component';
import { SecurityForgotPasswordComponent } from './security-forgot-password/security-forgot-password.component';
import { SecurityChangePasswordComponent } from './security-change-password/security-change-password.component';
import { SecurityEmailConfirmationComponent } from './security-email-confirmation/security-email-confirmation.component';

const routes: Routes = [
    {
        path: "",
        data: { title: "Login" },
        component: SecurityLoginComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: SecurityLoginFormComponent, canActivate: [LoginGuard] },
            { path: 'forgot-password', component: SecurityForgotPasswordComponent, canActivate: [LoginGuard] },
            { path: 'change-password', component: SecurityChangePasswordComponent, canActivate: [LoginGuard] },
            { path: 'confirm-email', component: SecurityEmailConfirmationComponent, canActivate: [LoginGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule {}
