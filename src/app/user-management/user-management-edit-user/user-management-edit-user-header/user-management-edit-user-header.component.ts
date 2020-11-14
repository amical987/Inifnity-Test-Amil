import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { UserBase } from "../../../core/models/user/user-base";
import { AvailablePermissions } from "../../../core/models/roles/available-permission.enum";
import { Router } from "@angular/router";

@Component({
    selector: "app-user-management-edit-user-header",
    templateUrl: "./user-management-edit-user-header.component.html",
    styleUrls: ["./user-management-edit-user-header.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementEditUserHeaderComponent {
    @Input()
    user: UserBase;
    permissions = AvailablePermissions;

    constructor(private router: Router) {}

    onSuccessDeleted(user: UserBase): void {
        this.router.navigate(["/user-management"]);
    }
}
