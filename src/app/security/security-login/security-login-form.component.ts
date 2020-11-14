import {
    Component,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserInterfaceUtilityService } from "src/app/core/utilities/user-interface-utility.service";

@Component({
    selector: "security-login-form",
    templateUrl: "security-login-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityLoginFormComponent {
    isBusy = false;
    remeberMe: boolean;
    user: any = {};
    error: any;
    paramSubscribe: any;
    @Output() onError: EventEmitter<any> = new EventEmitter();

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly activeRoute: ActivatedRoute,
        private readonly userInterfaceUtilityService: UserInterfaceUtilityService) {}

    login(user: any): void {
        this.error = null;
        this.isBusy = true;
        this.authService
            .login(user.username, user.password)
            .then(() => this.onSuccessfully())
            .catch(data => this.onFailed(data.error));
    }

    removeAuthenticationClass(): void {
        this.userInterfaceUtilityService.addBodyClass("bg-light");
        this.userInterfaceUtilityService.removeBodyClass("authentication");
    }

    private onSuccessfully(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(["/home"]);
        }

        this.isBusy = false;
        this.cd.markForCheck();
    }

    private onFailed(error): void {
        if (this.onError) {
            this.onError.emit(error);
        }
        this.isBusy = false;
        this.error = error;
        this.cd.markForCheck();
    }
}
