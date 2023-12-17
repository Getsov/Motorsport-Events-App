import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss'],
})
export class SelectDatesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  dates: { date: string; startTime: string; endTime: string }[] = [
    { date: '', startTime: '', endTime: '' },
  ];

  addDate() {
    this.dates.push({ date: '', startTime: '', endTime: '' });
    console.log(this.dates);
  }

  removeDate(index: number) {
    if (this.dates.length > 1) {
      this.dates.splice(index, 1);
    }
  }
}
