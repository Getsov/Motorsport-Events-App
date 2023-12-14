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

  @Input() highlightedDates: [] = [];

  ngOnInit() {
    console.log(this.highlightedDates);
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
