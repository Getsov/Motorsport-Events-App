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
        type: 'Off road',
        imageUrl:
          'data:image/jpeg;base64,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',
      },
      {
        type: 'Драг',
        imageUrl:
          'https://media.istockphoto.com/id/156784761/photo/car-race.jpg?s=612x612&w=0&k=20&c=bjOiWi_rsZXcODfxuNTEbGXmvYJs4dIexxyCTtBia-M=',
      },
      {
        type: 'Drift',
        imageUrl:
          'https://images.unsplash.com/photo-1613243700855-53ae46fd281e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpZnR8ZW58MHx8MHx8fDA%3D',
      },
      {
        type: 'Рали',
        imageUrl:
          'https://static.vecteezy.com/system/resources/thumbnails/030/602/108/small/rally-racing-car-is-racing-on-dirt-road-ai-generative-photo.jpg',
      },
      {
        type: 'Събори',
        imageUrl: 'https://www.haskovo.net/uploads/recipes/2015/04/02/5367.jpg',
      },
      {
        type: 'Картинг',
        imageUrl:
          'https://kinetikautomotive.com/wp-content/uploads/2020/09/image-kart2.jpg',
      },
    ];
  }
}
