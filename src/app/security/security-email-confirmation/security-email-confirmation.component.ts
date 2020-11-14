import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { SecurityApiService } from '../security-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
    selector: "security-email-confirmation",
    templateUrl: "security-email-confirmation.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityEmailConfirmationComponent implements OnInit {
    isBusy: boolean;
    paramSubscribe: any;
    token: string;
    success: boolean;
    errors: string[] = [];

    constructor(private readonly apiService: SecurityApiService,
        private readonly router: Router,
        private readonly activeRoute: ActivatedRoute,
        private readonly cd: ChangeDetectorRef) { }

    ngOnInit() { 
        this.getAndVerifyToken();
    }

    private getAndVerifyToken(): void {
        this.paramSubscribe = this.activeRoute.queryParamMap.subscribe(params => {
            this.token = decodeURIComponent(params.get('token')).replace(/\s/g, "+");
            if (this.token) {
                this.tryToConfirmUserEmailByToken();
            }
            else {
                this.router.navigate(['/']);
            }
        });
    }

    tryToConfirmUserEmailByToken(): void {
        this.setBusy(true);
        this.apiService.confirmUserEmailByToken(this.token).subscribe(() => {
            this.success = true;
            this.setBusy(false);
        }, (response) => {
            this.errors = response.error.errors;
            this.success = false;
            this.setBusy(false);
        })
    }

    private setBusy(isBusy: boolean) {
        this.isBusy = isBusy;
        this.cd.markForCheck();
    }
}
