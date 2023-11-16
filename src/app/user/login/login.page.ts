import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  backButton: boolean = false;

  authSegment: string = 'login';

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.authSegment = ev.detail.value;
  }
}
