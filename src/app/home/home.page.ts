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
        banner: '../../assets/icon/Image.svg',
        _id: 'asdasdsadsa',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.svg',
        _id: 'asdasdas',
        shortTitle: 'Кондофрей Драг 2023',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner: '../../assets/icon/Image.svg',
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
          'https://www.rudaw.net/Library/Assets//Gallery/Photos/Photos2020/1April-1june/BlindTahir/peshbrke-09092020/peshbrki-09092020%20(10).JPG',
      },
      {
        type: 'Drag racing',
        imageUrl: 'https://i.ytimg.com/vi/KpPni9A0jfY/maxresdefault.jpg',
      },
      {
        type: 'Drift',
        imageUrl:
          'https://gatebil.no/wp-content/uploads/2023/04/r6_l4692-scaled.jpg',
      },
      {
        type: 'Rally',
        imageUrl:
          'https://www.firestone.com.mx/content/dam/consumer/fst/la/mx/tips/otros/rally_b.jpg',
      },
      {
        type: 'Festival',
        imageUrl:
          'https://i0.wp.com/coloradocarshow.com/wp-content/uploads/2023/06/welcome.jpg?fit=1000%2C667&ssl=1',
      },
      {
        type: 'Carting race',
        imageUrl:
          'https://curiocity.com/wp-content/uploads/2022/05/BeFunky-collage-44.jpg',
      },
    ];
  }
}
