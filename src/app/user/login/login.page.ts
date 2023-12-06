import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginSubscription$!: Subscription;
  loginResponseError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLoginSubmit(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      return;
    }

    const { email, password } = loginFormData.value;

    this.loginSubscription$ = this.authService
      .login(email, password)
      .subscribe({
        next: () => {
          this.loginResponseError = '';
          this.router.navigateByUrl('/');
          loginFormData.reset();
        },
        error: (error) => {
          this.loginResponseError = error.error.error;
          loginFormData.reset();
        },
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
