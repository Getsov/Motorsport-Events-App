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
  notifications: number = 0;
  // TODO: fetch notifications
  // TODO: add conditional rendering for notifications number container
  ngOnInit() {}
}
