import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss'],
})
export class SlideCardComponent implements OnInit {
  @Input() event: Event = {
    shortTitle: '',
    dates: [],
    imageUrl: '',
    _id: '',
    likes: [],
    longTitle: '',
    shortDescription: '',
    longDescription: '',
    visitorPrices: [],
    contacts: {
      coordinates: {
        lat: 0,
        long: 0,
      },
      region: '',
      address: '',
      phone: '',
      email: '',
    },
    category: '',
    creator: { email: '', role: '', isDeleted: false },
    isDeleted: false,
  };

  constructor(private datePipe: DatePipe) {}

  lastDateIndex: number = 0;
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    this.lastDateIndex = this.event.dates.length - 1;

    this.startDate = this.formatDate(this.event.dates[0].date);
    this.endDate = this.formatDate(this.event.dates[this.lastDateIndex].date);
  }

  private formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd.MM.yy') || '';
  }
}
