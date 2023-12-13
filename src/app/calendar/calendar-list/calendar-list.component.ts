import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
})
export class CalendarListComponent implements OnInit {
  constructor() {}

  @Input() selectedDate: string = '';
  @Input() titleColor: string = 'orange';

  ngOnInit() {}
}
