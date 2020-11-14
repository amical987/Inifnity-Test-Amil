import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { SecurityApiService } from '../security-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "security-change-password",
    templateUrl: "security-change-password.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityChangePasswordComponent implements OnInit, OnDestroy {
    isBusy: boolean;
    paramSubscribe: any;
    token: string;
    isTokenValid: boolean;
    errors: string[] = [];
    passwordChangedSuccessfully: boolean;

    model: { password: string, repeatPassword: string } = <{ password: string, repeatPassword: string }>{};

    constructor(private readonly apiService: SecurityApiService,
        private readonly router: Router,
        private readonly activeRoute: ActivatedRoute,
        private readonly cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.getAndVerifyToken();
    }

    changePassword(): void {
        this.setBusy(true);
        this.apiService.changePasswordByToken(this.token, this.model.password).subscribe(() => {
            this.passwordChangedSuccessfully = true;
            this.setBusy(false);
        }, (response) => {
            this.errors = response.error.errors;
            this.setBusy(false);
        })
    }

    verifyResetPasswordToken(): void {
        this.setBusy(true);
        this.apiService.verifyResetPasswordToken(this.token).subscribe(() => {
            this.isTokenValid = true;
            this.setBusy(false);
        }, () => {
            this.isTokenValid = false;
            this.setBusy(false);
        })
    }

    verifyPasswordMatch(): boolean {
        this.errors = [];
        const match = this.model.password == this.model.repeatPassword
        if (!match) {
            this.errors.push("Passwords do not match with each other.");
            this.cd.markForCheck();
        }
        return match;
    }

    ngOnDestroy(): void {
        this.paramSubscribe.unsubscribe();
    }

    private getAndVerifyToken(): void {
        this.paramSubscribe = this.activeRoute.queryParamMap.subscribe(params => {
            this.token = decodeURIComponent(params.get('token')).replace(/\s/g, "+"); // For some reason, the browser replaces '+' with empty spaces during decoding token.
            if (this.token) {
                this.verifyResetPasswordToken();
            }
            else {
                this.router.navigate(['/']);
            }
        });
    }

    private setBusy(isBusy: boolean) {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }
}