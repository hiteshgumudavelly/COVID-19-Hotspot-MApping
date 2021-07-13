import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {

      if (!state.url.includes('login')) {
        this.router.navigate(['login']);
      }
      else {
        return true;
      }
      return false;
    }

    if (state.url.includes('login')) {
      this.router.navigate(['dashboard']);
    }

    return true;
  }
}