import { CanActivate, ActivatedRouteSnapshot, CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(private athSer: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (route.data) {
            if (! this.athSer.hasPermission(route.data.permission)) {
                this.router.navigate(['/backend/dashboard']);
                return false;
            }
            return true;
        }
        return true;
    }

    canLoad(route: Route): boolean {
        if (route.data) {
            if (! this.athSer.hasPermission(route.data.permission)) {
                this.router.navigate(['/backend/dashboard']);
                return false;
            }
            return true;
        }
        return true;
    }
}
