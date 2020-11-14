import { Component, ChangeDetectorRef } from "@angular/core";
import { UserBase } from "../../core/models/user/user-base";
import { UserManagementApiService } from "../../core/services/api/users-api.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import {  Router } from "@angular/router";

@Component({
    selector: "app-user-management-add-user",
    templateUrl: "./user-management-add-user.component.html",
    styleUrls: ["./user-management-add-user.component.scss"]
})
export class UserManagementAddUserComponent {
    user = {} as UserBase;
    isBusy: boolean;

    addUserForm = new FormGroup({
        firstNameFormControl: new FormControl(this.user.firstName, [Validators.required, Validators.maxLength(150)]),
        lastNameFormControl: new FormControl(this.user.lastName, [Validators.required, Validators.maxLength(150)]),
        emailFormControl: new FormControl(this.user.username, [Validators.required, Validators.email]),
    });


    constructor(
        private cd: ChangeDetectorRef,
        private dialogRef: MatDialogRef<UserManagementAddUserComponent>,
        private router: Router,
        private userApiService: UserManagementApiService
    ) {
    }

    onSubmit(): void {
        if (this.addUserForm.valid) {
            this.setBusy(true);
            this.userApiService.createAccount(this.user).subscribe(
                data => this.onSuccess(data),
                data => this.onError(data)
            );
        }
    }

    private onSuccess(data: any): void {
        this.setBusy(false);
        this.dialogRef.close();
        this.router.navigate(["user-management", data.records.payload]);
    }

    private onError(data: any): void {
        this.setBusy(false);
    }

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }
}
