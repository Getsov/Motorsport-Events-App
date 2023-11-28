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

  onLogin(loginFormData: NgForm) {
    if (loginFormData.invalid) {
      return;
    }

    console.log(loginFormData);
  }
}
