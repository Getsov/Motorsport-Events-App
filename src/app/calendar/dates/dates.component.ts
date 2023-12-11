import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  constructor() {}

  highlightedDates = [
    {
      date: '2024-01-05',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2024-01-10',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2024-01-20',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
    {
      date: '2024-01-23',
      textColor: '#0D0D0D',
      backgroundColor: '#FF7418',
    },
  ];

  ngOnInit() {}
}
