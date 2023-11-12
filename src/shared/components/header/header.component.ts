import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  notification: number = 3;
  // TODO: fetch notifications
  // TODO: add conditional rendering for notifications number container
  ngOnInit() {}
}
