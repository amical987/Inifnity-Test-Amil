import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { UserBase, UserStatus } from "../../../core/models/user/user-base";
import { AvailablePermissions } from "../../../core/models/roles/available-permission.enum";
import { AuthService } from "../../../core/services/auth.service";
import { UserManagementApiService } from "../../../core/services/api/users-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-user-management-edit-user-status",
    templateUrl: "./user-management-edit-user-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementEditUserStatusComponent implements OnInit {

    @Input()
    user = {} as UserBase;

    @Output()
    onSaved = new EventEmitter();

    editPermitted: boolean;
    isBusy: boolean;

    userStatus = UserStatus;
    permissions = AvailablePermissions;

    editUserStatusForm = new FormGroup({
        statusFormControl: new FormControl(this.user.status, [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private userApiService: UserManagementApiService) {
    }

    ngOnInit(): void {
        this.verifyEditPermission();
    }

    onSubmit(): void {
        this.setBusy(true);
        this.userApiService.updateUserAccountStatus(this.user).subscribe(
            data => this.onSuccess(),
            () => this.setBusy(false)
        );
    }

    private onSuccess(): void {
        this.setBusy(false);
        this.emitSuccessEvent();
    };

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }

    private emitSuccessEvent(): void {
        if (this.onSaved) {
            this.onSaved.emit(this.user);
        }
    }

    private verifyEditPermission(): void {
        const currentLoggedUser = this.authService.getUserProfile();
        this.editPermitted = currentLoggedUser.id !== this.user.id;
        this.cd.markForCheck();
    }
}
