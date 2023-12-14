import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle: string = '';
  @Input() backButton: boolean = false;
  @Input() defaultHref: string = '';

  constructor() {}
  notifications: number = 23;
  // TODO: fetch notifications
  // TODO: set limit to 99 after the fetch.
  ngOnInit() {}
}
