import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';

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
    creator: '',
    isDeleted: false,
  };

  constructor() {}

  lastDateIndex: number = 0;
  ngOnInit() {}
}
