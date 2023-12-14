import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor(private datePipe: DatePipe) {}

  @Input() pageTitle: string = 'Календар';
  @Input() selectedDate: string = '';
  @Input() selectedYearMonth: string = '';

  handleSelectedDateChange(date: string) {
    this.selectedDate = date;
    // format the selectedYearMonth to specific string rerquired by the service.
    this.selectedYearMonth = date.slice(3).replace('.', '/');
    console.log(this.selectedYearMonth);
  }

  ngOnInit() {}
}
