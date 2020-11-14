import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { SecurityApiService } from '../security-api.service';

@Component({
    selector: "security-forgot-password",
    templateUrl: "security-forgot-password.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityForgotPasswordComponent {
    isBusy = false;
    email: string;
    errors: string[];
    successfullySent: boolean;
    instructionsResendSent: boolean;

    constructor(private readonly apiService: SecurityApiService, private readonly cd: ChangeDetectorRef) { }

    sendInstructions(instructionsResendSent?: boolean): void {
        this.setBusy(true);
        this.apiService.resetPassword(this.email).subscribe(() => {
            this.successfullySent = true;
            this.instructionsResendSent = instructionsResendSent;
            this.setBusy(false);
        }, (response) => {
            this.errors = response.error.errors;
            this.successfullySent = false;
            this.setBusy(false);
        });
    }

    
    private setBusy(isBusy: boolean) {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }
}