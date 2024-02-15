import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { roleType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn) {
        return true;
      }

      if(this.authService.isUserRole(roleType.admin)) {
        this.router.navigate(['/admin/dashboard']);
      } else if(this.authService.isUserRole(roleType.customer)) {
        this.router.navigate(['/customer/dashboard']);
      } else if(this.authService.isUserRole(roleType.driver)) {
        this.router.navigate(['/driver/dashboard']);
      }else {
        this.authService.cleanLocalStorage()
        this.router.navigate(['/login']);
      }

      return false;
  }
}
