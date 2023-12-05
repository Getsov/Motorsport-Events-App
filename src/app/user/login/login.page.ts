import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginResponseError: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLoginSubmit(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      return;
    }

    const { email, password } = loginFormData.value;

    this.authService.login(email, password).subscribe({
      next: (authResponse) => {
        console.log(authResponse);
      },
      error: (error) => {
        this.loginResponseError = error.error.error;
      },
    });
  }
}
