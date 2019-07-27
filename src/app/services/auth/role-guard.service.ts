import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PreviousRouteService } from '@app/services/auth/previous-route/previous-route.service';

@Injectable()
export class RoleGuardService implements CanActivateChild {
  constructor(
    public auth: AuthService,
    public router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    if (
      !this.auth.isAuthenticated() ||
      tokenPayload.userPermissions < expectedRole[0] ||
      tokenPayload.userPermissions > expectedRole[1]
    ) {
      const previous = state.url;
      this.router.navigate(['home/login'], {
        queryParams: { previous: previous }
      });
      return false;
    } else {
      return true;
    }
  }
}
