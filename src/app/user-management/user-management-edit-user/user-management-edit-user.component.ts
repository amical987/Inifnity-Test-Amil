import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from
    "@angular/core";
import { UserBase } from "../../core/models/user/user-base";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserManagementApiService } from "../../core/services/api/users-api.service";

@Component({
    selector: "app-user-management-edit-user",
    templateUrl: "./user-management-edit-user.component.html",
    styleUrls: ["./user-management-edit-user.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class UserManagementEditUserComponent implements OnInit, OnDestroy {
    user: UserBase;
    isBusy: boolean;
    queryParamsSubscriber: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private userApiService: UserManagementApiService) {
    }

    ngOnInit() {
        this.loadUser();
    }

    loadUser(): void {
        this.queryParamsSubscriber = this.activatedRoute.params.subscribe(
            params => {
                const id = params["id"];
                this.userApiService.getUserById(id).subscribe(
                    response => this.onSuccess(response),
                    response => this.onError(response)
                );
            }
        );
    }

    private onSuccess(response: any): void {
        this.user = response.records;
        this.setBusy(false);
    }

    private onError(response: any): void {
        if (response.status === 404) {
            this.router.navigate(["/errors/404"]);
        }
        this.setBusy(false);
    }

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }

    onChanged(user: UserBase): void {
        this.loadUser();
    }

    ngOnDestroy(): void {
        this.queryParamsSubscriber.unsubscribe();
    }
}
