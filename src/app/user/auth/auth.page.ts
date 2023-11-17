import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthPage implements OnInit {
  backButton: boolean = false;

  authSegment: string = 'login';

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.authSegment = ev.detail.value;
  }
}
