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
export class EventCreatorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const eventId = route.paramMap.get('eventId');

    return this.authService.userData$.pipe(
      take(1),
      map((userData) => {
        const isCreator = userData?.createdEvents.includes(eventId!);
        if (!isCreator) {
          this.router.navigateByUrl('tabs/events');
          return false;
        }
        return true;
      })
    );
  }
}
