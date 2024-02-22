import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { BulgarianDateFormatPipe } from 'src/shared/pipes/BulgarianMonthPipe';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss'],
  providers: [BulgarianDateFormatPipe],
})
export class CalendarListComponent implements OnInit, OnChanges {
  constructor(
    private datePipe: DatePipe,
    private bulgarianDatePipe: BulgarianDateFormatPipe
  ) {}

  @Input() selectedDate: string = '';
  @Input() titleColor: string = 'orange';
  @Input() currentMonthEvents: Event[] = [];
  filteredDates: Event[] = [];
  initialMonth: string = '';
  selectedMonth: number | undefined;

  ngOnInit() {
    this.filteredDates = this.currentMonthEvents;
    this.initialMonth = this.bulgarianDatePipe.transform(this.selectedDate);
  }

  ngOnChanges() {
    this.filteredDates = this.currentMonthEvents.filter((event: Event) => {
      return event.dates.some((dates) => {
        const currentDate = this.datePipe.transform(dates.date, 'dd.MM.yyyy');
        return this.selectedDate === currentDate;
      });
    });

    this.initialMonth = this.bulgarianDatePipe.transform(this.selectedDate);
  }
}
