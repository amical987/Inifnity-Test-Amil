import {
    Component,
    OnInit,
    forwardRef,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy
} from "@angular/core";
import { SecurityLoginFormComponent } from "./security-login-form.component";
import { UserInterfaceUtilityService } from 'src/app/core/utilities/user-interface-utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: "security-login",
    templateUrl: "security-login.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityLoginComponent implements OnInit, OnDestroy {
    users = [];
    remeberMe: boolean;
    bypassForm: boolean;
    error: any;

    @ViewChild(forwardRef(() => SecurityLoginFormComponent), { static: false })
    loginForm: SecurityLoginFormComponent;

    constructor(
        private readonly userInterfaceUtilityService: UserInterfaceUtilityService,
        private readonly cd: ChangeDetectorRef,
        private readonly router: Router,
        private readonly authService: AuthService) { }

    ngOnInit(): void {
        this.setAuthenticationClass();
    }

    login(user: any): void {
        this.loginForm.login(user);
    }

    onError($event: any): void {
        this.error = $event;
        this.cd.markForCheck();
    }

    setAuthenticationClass(): void {
        this.userInterfaceUtilityService.removeBodyClass('bg-light');
        this.userInterfaceUtilityService.addBodyClass('authentication');
    }

    removeAuthenticationClass(): void {
        this.userInterfaceUtilityService.addBodyClass('bg-light');
        this.userInterfaceUtilityService.removeBodyClass('authentication');
    }

    ngOnDestroy(): void {
        this.removeAuthenticationClass()
    }
}
