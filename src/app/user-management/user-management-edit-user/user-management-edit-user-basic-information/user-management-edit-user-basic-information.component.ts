import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from
    "@angular/core";
import { UserBase } from "../../../core/models/user/user-base";
import { AvailablePermissions } from "../../../core/models/roles/available-permission.enum";
import { UserManagementApiService } from "../../../core/services/api/users-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-user-management-edit-user-basic-information",
    templateUrl: "./user-management-edit-user-basic-information.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class UserManagementEditUserBasicInformationComponent {

    @Input()
    user = {} as UserBase;
    @Output()
    onSaved = new EventEmitter();

    isBusy: boolean;
    permissions = AvailablePermissions;

    editBasicInfoForm = new FormGroup({
        firstNameFormControl: new FormControl(this.user.firstName, [Validators.required, Validators.maxLength(150)]),
        lastNameFormControl: new FormControl(this.user.lastName, [Validators.required, Validators.maxLength(150)]),
        phoneNumberFormControl: new FormControl(this.user.phoneNumber, [Validators.maxLength(16)])
    });

    constructor(
        private cd: ChangeDetectorRef,
        private userApiService: UserManagementApiService) {
    }

    onSubmit(): void {
        if (!this.editBasicInfoForm.valid) return;

        this.isBusy = true;
        this.userApiService.updateUserBasicInformationById(this.user).subscribe(
            data => this.onSuccess(),
            () => this.setBusy(false)
        );
    }

    private onSuccess(): void {
        if (this.onSaved) {
            this.onSaved.emit(this.user);
        }
        this.setBusy(false);
    };

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }
}
