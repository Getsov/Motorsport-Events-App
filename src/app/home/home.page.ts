import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}
  // TODO: import interfaces
  slides: any[] = [];
  eventsType: any[] = [];

  ngOnInit() {
    // TODO : fetch lastest events data
    this.slides = [
      {
        banner:
          'https://media.istockphoto.com/id/1268369774/photo/1957-chevrolet-belair-hardtop-coupe.jpg?s=612x612&w=0&k=20&c=EgjIEjkroLQCAaRvIzD_F502NLeU2mfKgZxWdMdYnSE=',
      },
      {
        banner:
          'https://logodownload.org/wp-content/uploads/2014/04/mercedes-benz-logo-0.png',
      },
      {
        banner:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Audi_logo_detail.svg/2560px-Audi_logo_detail.svg.png',
      },
    ];
    // TODO: fetch events type list
    this.eventsType = [
      {
        type: 'All',
        imageUrl: 'https://m.media-amazon.com/images/I/41i2wgm-JsL.jpg',
      },
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
