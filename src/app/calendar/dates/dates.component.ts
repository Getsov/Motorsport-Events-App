import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}

  highlightedDates = [
    {
      date: '2023-12-05',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2023-12-10',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2023-12-20',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2023-12-23',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
  ];

  ngOnInit() {}

  onDateFocus(event: any) {
    const date = event.detail.value;
    const formattedDate = this.datePipe.transform(
      date,
      'dd.MM.yyyy' || undefined
    );

    if (formattedDate) {
      //TODO fetch data
      console.log(formattedDate);
    }
  }
}
