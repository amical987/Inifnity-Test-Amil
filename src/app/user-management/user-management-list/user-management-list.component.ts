import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { UserBase } from "../../core/models/user/user-base";
import { ApiResponse } from "../../core/models/api/api-response";
import { UserManagementApiService } from "../../core/services/api/users-api.service";
import { MatPaginator, PageEvent, MatDialog } from "@angular/material";
import { UserManagementAddUserComponent } from "../user-management-add-user/user-management-add-user.component";
import { AvailablePermissions } from "../../core/models/roles/available-permission.enum";

@Component({
    selector: "user-management-list",
    templateUrl: "user-management-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementListComponent implements OnInit {
    pageEvent = { pageSize: 8, pageIndex: 0 } as PageEvent;
    isBusy: boolean;
    response: ApiResponse<UserBase[]>;
    searchControl: FormControl;
    debounceTime: number;
    displayedColumns: string[] = ["fullName", "email", "status", "action"];
    @ViewChild(() => MatPaginator, { static: true })
    paginator: MatPaginator;
    permissions = AvailablePermissions;

    constructor(
        private userManagementApiService: UserManagementApiService,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.debounceTime = 400;
        this.searchControl = new FormControl();
        this.searchControl.valueChanges
            .pipe(debounceTime(this.debounceTime))
            .subscribe(() => {
                this.resetPageEvent();
                this.searchUsers();
            });
        this.searchUsers();
    }

    searchUsers(): void {
        this.setBusy(true);
        const keyword = this.searchControl.value
            ? this.searchControl.value
            : "";

        this.userManagementApiService
            .searchUsers(keyword, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize)
            .subscribe(data => this.onSuccess(data), () => this.setBusy(false));
    }

    pageChange(pageEvent: PageEvent): void {
        this.pageEvent = pageEvent;
        this.cd.markForCheck();
        this.searchUsers();
    }

    onSuccess(response: ApiResponse<UserBase[]>): void {
        this.response = response;
        this.pageEvent.length = response.paginationInfo.total;
        this.setBusy(false);
    }

    add(): void {
        this.dialog.open(UserManagementAddUserComponent,
            {
                width: "500px"
            });
    }

    private setBusy(isBusy: boolean): void {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }

    private resetPageEvent(): void {
        this.pageEvent.pageIndex = 0;
        this.pageEvent.previousPageIndex = 0;
        this.pageEvent.length = 0;
    }
}
