import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivateChild  {
  constructor(public auth: AuthService, public router: Router) {}
  canActivateChild(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/home/login']);
      return false;
    }
    return true;
  }
}
