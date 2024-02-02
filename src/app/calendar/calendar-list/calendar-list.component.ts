import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
})
export class CalendarListComponent implements OnInit, OnChanges {
  constructor(private datePipe: DatePipe) {}

  @Input() selectedDate: string = '';
  @Input() titleColor: string = 'orange';
  @Input() currentMonthEvents: Event[] = [];
  filteredDates: Event[] = [];
  initialMonth: string = '';
  selectedMonth: number | undefined;

  ngOnInit() {
    this.filteredDates = this.currentMonthEvents;
    const today = new Date();

    // Getting full month name (e.g. "февруари")
    const month = today.toLocaleString('bg-BG', { month: 'long' });
    this.initialMonth = `${month}` + ` ${new Date().getFullYear()}`;
    this.selectedMonth = new Date(Date.parse(this.selectedDate)).getMonth();
  }

  ngOnChanges() {
    this.filteredDates = this.currentMonthEvents.filter((event: Event) => {
      return event.dates.some((dates) => {
        const currentDate = this.datePipe.transform(dates.date, 'dd.MM.yyyy');
        return this.selectedDate === currentDate;
      });
    });
  }
}
