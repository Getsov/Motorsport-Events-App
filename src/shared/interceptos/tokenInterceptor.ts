import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err) => this.handleAuthError(err, req, next)));
  }

  handleAuthError(
    err: HttpErrorResponse,
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (err && err.status === 401) {
      return this.authService.getNewAccessToken().pipe(
        switchMap((response) => {
          console.log(response, '401 error');

          // set the received new access token
          this.authService.updateAccessToken(response.accessToken);

          // retry the original request
          // Issue is here: error from BE "Invalid authorization token" regardless it is updated in the function updateAccessToken above?
          return next.handle(originalRequest);
        }),
        catchError((err) => {
          console.log('error', err);
          // User has a token but it is invalid - delete the refresh token and redirect to login
          this.authService.logout();
          this.router.navigateByUrl('/tabs/user/auth');
          return throwError('Invalid token, user logged out');
        })
      );
    } else {
      // Throw original error
      return throwError(() => err);
    }
  }
}
