import { Pipe, PipeTransform } from "@angular/core";
import { UserStatus } from "../../core";

@Pipe({
    name: "userStatus"
})
export class UserStatusPipe implements PipeTransform {
    transform(status: UserStatus, args?: any): string {
        switch (status) {
        case UserStatus.Enabled:
            return "Enabled";
        case UserStatus.Disabled:
            return "Disabled";
        default:
            return "N/A";
        }
    }
}
