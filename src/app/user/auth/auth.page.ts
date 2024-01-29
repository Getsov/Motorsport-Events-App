import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  backButton: boolean = false;

  authSegment: string = 'login';

  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.authSegment = ev.detail.value;
  }

  toggleAuthSegmentChange(newSegment: string) {
    this.authSegment = newSegment;
  }
}
