import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { UserBase } from "../../core/models/user/user-base";
import { AuthService } from "../../core/services/auth.service";
import { UserManagementApiService } from '../../core/services/api/users-api.service';

@Component({
    selector: "app-user-management-delete-user",
    templateUrl: "./user-management-delete-user.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementDeleteUserComponent implements OnInit {
    @Input() user: UserBase;
    @Output() onSuccessDeleted = new EventEmitter<UserBase>();
    @Output() onErrorDeleted = new EventEmitter<any>();

    isBusy: boolean;
    isDeletePermitted: boolean;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private userApiService: UserManagementApiService) { }

    ngOnInit(): void {
        this.checkIfDeletePermitted(); // The user cannot delete his account?
    }

    delete(): void {
        const answer = confirm(`Are you sure you want delete account: ${this.user.fullName}`);
        if (!answer) return;
        this.setBusy(true);
        this.userApiService
            .deleteAccount(this.user)
            .subscribe(() => this.onSuccess(), data => this.onError(data));
    }

    private onSuccess(): void {
        if (this.onSuccessDeleted) {
            this.onSuccessDeleted.emit(this.user);
        }
        this.setBusy(false);
    }

    private onError(data: any): void {
        if (this.onErrorDeleted && data && data.error) {
            this.onErrorDeleted.emit(data.error.errors);
        }
        this.setBusy(false);
    }

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }

    private checkIfDeletePermitted(): void {
        const loggedUser = this.authService.getUserProfile();
        this.isDeletePermitted = loggedUser.id !== this.user.id;
        this.cd.markForCheck();
    }
}
