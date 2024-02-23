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
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          // Reset the counter if the refresh token is successful
          this.errorCounter = 0;
          return of('Token refreshed successfully');
        }),
        catchError(() => {
          this.errorCounter++;
          // User has a token but it is invalid - delete the refresh token and redirect to login
          this.authService.revokeRefreshToken().subscribe({
            next: () => {
              this.authService.logout();
              this.router.navigateByUrl('/tabs/user/auth');
            },
          });
          return throwError('Invalid token, user logged out');
        })
      );
    } else {
      // Reset the counter when it is not 401 error
      this.errorCounter = 0;
      return throwError(() => new Error('Non-Authentication Error'));
    }
  }
}
