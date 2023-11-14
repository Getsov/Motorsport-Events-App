import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  defaultHref: string = '/tabs/events';
  backButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    // TODO: Redirect to register page
  }
}
