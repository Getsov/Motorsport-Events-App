import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: any;
  location = 'assets/icon/icon-location.svg';
  constructor() {}

  ngOnInit() {}
}
