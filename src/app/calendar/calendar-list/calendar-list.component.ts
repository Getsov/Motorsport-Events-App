import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
})
export class CalendarListComponent implements OnInit {
  constructor(private eventService: EventsService) {}

  @Input() selectedDate: string = '';
  @Input() titleColor: string = 'orange';
  @Input() events: any = [];
  @Input() currentMonthEvents: Event[] = [];

  ngOnInit() {}
}
