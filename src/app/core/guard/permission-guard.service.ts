import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class PermissionGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkIfCanActive((<any>route.data).allowedPermissions);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkIfCanActive((<any>childRoute.data).allowedPermissions);
    }


    private checkIfCanActive(allowedPermissions: any[]): boolean {
        if (!allowedPermissions) {
            return true;
        }

        const userPermissions = this.authService.getPermissions();
        const any = allowedPermissions.some(p => userPermissions.some(permission => permission === p));

        if (!any) {
            this.router.navigate(["/errors/401"]);
        }
        return any;
    }
}
