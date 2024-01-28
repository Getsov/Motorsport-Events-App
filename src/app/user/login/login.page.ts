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

  toasterMessage: string = '';
  toasterType: string = '';

  ngOnInit() {}

  onLoginSubmit(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      // touch every input so the invalid become red
      return Object.values(loginFormData.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const { email, password } = loginFormData.value;

    this.loginSubscription$ = this.authService
      .login(email, password)
      .subscribe({
        next: () => {
          this.loginResponseError = '';

          this.toasterMessage = 'Успешно влязохте във Вашия акаунт!';
          this.toasterType = 'success';

          setTimeout(() => {
            this.router.navigateByUrl('/');
            this.resetToasters();
            loginFormData.reset();
          }, 1000);
        },
        error: (error) => {
          this.errorToaster(error.error.error);

          loginFormData.reset();
        },
      });
  }

  // present error toaster
  errorToaster(errorMessage: string) {
    this.toasterMessage = errorMessage;
    this.toasterType = 'error';

    setTimeout(() => {
      this.resetToasters();
    }, 5000);
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
