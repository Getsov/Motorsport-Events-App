import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor() {}
  @Input() pageTitle: string = 'Календар';
  selectedDate: string = '';

  handleSelectedDateChange(date: string) {
    this.selectedDate = date;
    console.log(this.selectedDate);
  }
  ngOnInit() {}
}
