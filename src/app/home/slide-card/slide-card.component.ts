import { Component, Input, OnInit } from '@angular/core';
import { ShortenedEvent } from 'src/shared/interfaces/ShortenedEvent';

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss'],
})
export class SlideCardComponent implements OnInit {
  @Input() event: ShortenedEvent = {
    shortTitle: '',
    dates: [],
    imageUrl: '',
    _id: '',
    likedCount: 0,
  };

  constructor() {}

  lastDateIndex: number = 0;
  ngOnInit() {
    this.lastDateIndex = this.event.dates.length - 1;
  }
}
