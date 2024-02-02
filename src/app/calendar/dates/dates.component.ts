import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}

  @Output() selectedDateChange: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() highlightedDates: [] | undefined;
  public selectedDate: any;
  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate());
    this.selectedDate = date.toISOString();
  }
  onDateChange(event: any) {
    const date = event.detail.value;
    const formattedDate = this.datePipe.transform(
      date,
      'dd.MM.yyyy' || undefined
    );

    if (formattedDate) {
      this.selectedDateChange.emit(formattedDate);
    }
  }
}
