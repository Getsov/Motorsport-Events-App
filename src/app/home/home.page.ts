import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}
  // TODO: import interfaces
  upcomingEvents: any[] = [];
  eventsType: any[] = [];

  ngOnInit() {
    // TODO : fetch lastest events data
    this.upcomingEvents = [
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdsadsa',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdas',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdasd',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdasd',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdasd',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdasd',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.jpg',
        _id: 'asdasdasd',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
    ];
    // TODO: fetch events type list
    this.eventsType = [
      {
        type: 'Драг',
        imageUrl: '../../assets/icon/category-icons/drag.jpg',
      },
      {
        type: 'Drift',
        imageUrl: '../../assets/icon/category-icons/drift.jpg',
      },
      {
        type: 'Писта',
        imageUrl: '../../assets/icon/category-icons/pista.jpg',
      },
      {
        type: 'Планинско',
        imageUrl: '../../assets/icon/category-icons/mountain.jpg',
      },
      {
        type: 'Тайм Трак',
        imageUrl: '../../assets/icon/category-icons/time-track.jpg',
      },
      {
        type: 'Рали',
        imageUrl: '../../assets/icon/category-icons/rally.jpg',
      },
      {
        type: 'Мотори',
        imageUrl: '../../assets/icon/category-icons/bikes.jpg',
      },
      {
        type: 'Събори',
        imageUrl: 'https://www.haskovo.net/uploads/recipes/2015/04/02/5367.jpg',
      },
    ];
  }
}
