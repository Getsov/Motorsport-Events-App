import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLoginSubmit(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      return;
    }

    const { email, password } = loginFormData.value;

    this.loginSubscription$ = this.authService
      .login(email, password)
      .subscribe({
        next: (authResponse) => {
          console.log(authResponse);
          // TODO: do something with the response
          // TODO: navigate to home
        },
        error: (error) => {
          this.loginResponseError = error.error.error;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
