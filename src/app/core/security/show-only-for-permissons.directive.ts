import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { AvailablePermissions } from "../models/roles/available-permission.enum";
import { UserBase } from "../models/user/user-base";
import { AuthService } from "../services/auth.service";

@Directive({
    selector: "[showOnlyForPermissions]"
})
export class ShowOnlyForPermissionsDirective implements OnInit {
    @Input("bypassPermissionWithAuthenticatedUser")
    user: UserBase;

    @Input("showOnlyForPermissions")
    permissions: AvailablePermissions [] = [];

    constructor(
        private element: ElementRef,
        private authService: AuthService) {
    }

    ngOnInit(): void {
        const user = this.authService.getUserProfile();
        if (this.user && this.user.id === user.id) {
            return;
        }

        const userPermissions = this.authService.getPermissions();
        const any = this.permissions.some(p => userPermissions.some(permission => permission === p));

        if (!any) {
            this.element.nativeElement.remove();
            return;
        }
    }
}
