import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { UserStatus, UserBase } from "../../core/models/user/user-base";


@Component({
    selector: "user-status",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: "<span>{{user.status | userStatus}}</span>"
})
export class UserStatusComponent {
    @Input()
    user: UserBase;
    accountStatus = UserStatus;
}
