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
      // Attempt to refresh the token
      return this.authService.getNewAccessToken().pipe(
        switchMap((response) => {
          const newAccessToken = response.accessToken;

          // Update the access token in AuthService state and local storage
          this.authService.updateAccessToken(newAccessToken);

          // Clone the failed request and add the new access token in the headers
          const updatedRequest = originalRequest.clone({
            setHeaders: { 'X-Authorization': newAccessToken },
          });

          // Retry the request with the updated access token
          return next.handle(updatedRequest);
        }),
        catchError((refreshErr) => {
          // Handle failure (e.g., refresh token is invalid or expired)
          console.error('Error refreshing token:', refreshErr);
          this.authService.logout();
          this.router.navigateByUrl('/tabs/user/auth');
          return throwError(
            () => new Error('Session expired, please login again.')
          );
        })
      );
    } else {
      // If the error is not 401, just forward the original error
      return throwError(() => err);
    }
  }
}
