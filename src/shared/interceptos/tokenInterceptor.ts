import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  errorCounter: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err && err.status === 401 && this.errorCounter !== 1) {
      this.authService.refreshToken().subscribe({
        next: () => {
          // token gets refreshed
          // todo: notify the user to try again?
        },
        error: () => {
          // user has token but it is invalid - delete the refresh token and redirect to login
          this.authService.revokeRefreshToken().subscribe({
            next: () => {
              this.authService.logout();
              this.router.navigateByUrl('/tabs/user/auth');
            },
          });
        },
      });
      return of('Refreshing token...');
    } else {
      // reset the counter and throw error so it can go to error on the 35 line above
      this.errorCounter = 0;
      return throwError(() => new Error('Non Authentication Error'));
    }
  }
}
