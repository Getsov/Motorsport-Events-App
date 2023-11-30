import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onLoginSubmit(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      return;
    }

    const { email, password } = loginFormData.value;
    // TODO: userservice.login()
    console.log('submitted');
  }
}
