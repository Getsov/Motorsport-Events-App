import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userData$.pipe(
      take(1),
      map((hasUserData) => {
        const isLogged = !!hasUserData;
        const isRegularUser = hasUserData?.role === 'regular';
        if (!isLogged || isRegularUser) {
          this.router.navigateByUrl('tabs/user/auth');
        }
        return isLogged;
      })
    );
  }
}
