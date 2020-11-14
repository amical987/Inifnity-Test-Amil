import { Injectable, Inject, forwardRef } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
        @Inject(forwardRef(() => Router)) private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }

    private checkLogin(): boolean {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(["/"]);
            return false;
        }

        return true;
    }
}
