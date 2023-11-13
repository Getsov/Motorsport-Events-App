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
        banner:
          'https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/395417392_297552193169306_9035138858506285004_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AaO3f2ReSVYAX8Tlwqh&_nc_ht=scontent.fsof9-1.fna&oh=00_AfA5K8LxdZsGg_oqlv0T6ipnllLjIEz4K5ezTaU30RvHrA&oe=655786D1',
        _id: 'asdasdsadsa',
        shortTitle: 'Русе офроуд - закриване на сезона',
        startDate: '10-11-2023',
        endDate: '13.11.23',
      },
      {
        banner:
          'https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/386550258_795871775879118_4644925594399427326_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ShN43pzRwfYAX8eSMH0&_nc_ht=scontent.fsof9-1.fna&oh=00_AfDaZbFPzVKZrkbcuuGc_3eK0OvUVj8t6XhLcTXWU8bQJA&oe=65562933',
        _id: 'asdasdas',
        shortTitle: 'Overdrive Lap Battle 10 years anniversary event',
        startDate: '10-11-2023',
        endDate: '13.11.23',
      },
      {
        banner:
          'https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/395417392_297552193169306_9035138858506285004_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AaO3f2ReSVYAX8Tlwqh&_nc_ht=scontent.fsof9-1.fna&oh=00_AfA5K8LxdZsGg_oqlv0T6ipnllLjIEz4K5ezTaU30RvHrA&oe=655786D1',
        _id: 'asdasdasd',
        shortTitle: 'Русе офроуд - закриване на сезона',
        startDate: '10-11-2023',
        endDate: '13.11.23',
      },
      {
        banner:
          'https://scontent.fsof9-1.fna.fbcdn.net/v/t39.30808-6/396961537_180703608424529_2829577634238875275_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=S3mjF7l1f0EAX_RMa8l&_nc_ht=scontent.fsof9-1.fna&oh=00_AfCHVeQOWPLZ_8v49kPgT1MjLHQqVWuLO4vcCmFDsjrrgA&oe=6556A1FF',
        _id: 'asdasdasd',
        shortTitle: 'SoDrift Sofia final',
        startDate: '12-11-2023',
        endDate: '14.11.23',
      },
      {
        banner:
          'https://rallypamporovo.bg/wp-content/uploads/2023/11/dsc_0009-3-2-1024x764.jpeg',
        _id: 'asdasdasd',
        shortTitle: 'Рали спринт Пампорово 2023',
        startDate: '11-11-2023',
        endDate: '11.11.23',
      },
    ];
    // TODO: fetch events type list
    this.eventsType = [
      {
        type: 'Драг',
        imageUrl: '../../assets/icon/category-icons/drag.jpg',
      },
      {
        type: 'Дрифт',
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
        type: 'Тайм Атак',
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
