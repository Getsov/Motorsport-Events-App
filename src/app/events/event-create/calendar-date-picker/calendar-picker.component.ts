import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss'],
})
export class CalendarDatePickerComponent implements OnInit {
  todayDate: any;
  @Input() selectedDate: any = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.todayDate = this.datePipe.transform(
      Date.now(),
      'yyyy-MM-dd' || undefined
    );
  }

  onDateChange(date: any): void {
    this.selectedDate = this.datePipe.transform(
      date,
      'dd.MM.YYYY' || undefined
    );
  }
}
