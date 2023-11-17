import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController, NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { getDayOfWeek } from 'src/shared/utils/date-utils';
import { EventMarkerModalPage } from './event-marker-modal/event-marker-modal.page';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  headerTitle: string = 'Детайли за събитие';
  defaultHref: string = '/tabs/events';
  backButton: boolean = true;

  mockEvent: Event = {
    shortTitle: 'Кондофрей Драг 2023',
    longTitle: '"Кондофрей Драг 2023" - село Кондофрей, летище "София-Запад"',
    imageUrl: 'https://i.ytimg.com/vi/t52ovr-qdB0/maxresdefault.jpg',
    shortDescription: 'Драг Рейсинг - Кондофрей [29-30 Април]',
    longDescription: `Кондофрей Драг е най-голямото и вълнуващо драг състезание в България, което привлича състезатели и фенове от цялата страна и дори извън нея. Събитието включва разнообразие от класове, от улични автомобили до професионални драгстери. Зрителите могат да се насладят на страхотното състезание, както и на храна и напитки. Гледайте как мощни машини ускоряват от 0 до 60 за секунди и достигат скорости от над 200км/ч.`,
    dates: [
      { date: '15 декември 2023', startTime: '9:00', endTime: '19:30' },
      { date: '16 декември 2023', startTime: '10:00', endTime: '16:30' },
    ],
    contacts: {
      region: 'Кондофрей',
      address: 'София Уест Еърпорт',
      phone: '0888888888',
      email: 'kondofrey@abv.bg',
      coordinates: { lat: 42.448154, long: 22.963561 },
    },
    category: 'Драг',
    creator: 'Драг Клуб - София',
    _id: '01',
    isDeleted: false,
    likedCount: 2,
    visitorPrices: [
      { price: 50, description: 'за 1 ден вход - събота или неделя' },
      { price: 80, description: 'за 2 ден вход - събота и неделя' },
      { price: 120, description: 'за 2 дена вход - събота и неделя + VIP' },
    ],
    participantPrices: [
      { price: 150, description: 'за плащане по банков път' },
      {
        price: 120,
        description: 'за плащане по банков път и член на “БМВ Клуб България”',
      },
      { price: 200, description: 'за плащане на място' },
      {
        price: 160,
        description: 'за плащане на място и член на “БМВ Клуб България”',
      },
    ],
  };

  titleSeparatorColor: string = 'orange';

  infoSeparatorText: string = 'Информация за събитието';
  infoSeparatorColor: string = 'yellow';

  errorMessage: string = '';
  getDayOfWeek = getDayOfWeek;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId')) {
        this.navController.navigateBack('/tabs/events');
        return;
      }

      //   TODO: Fetch event from service
      //   eventsService.getEvent(paramMap.get('eventId').subscribe({
      //   next: (response) => {
      //     this.mockEvent = response;
      //   },
      //   error: (error) => {
      //     this.errorMessage = error.message;
      //   },
      // })
    });
  }

  addEventToFavourites() {
    // TODO: add event to favourites via service
  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: this.mockEvent._id,
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: this.mockEvent.contacts.coordinates.lat,
          lng: this.mockEvent.contacts.coordinates.long,
        },
        zoom: 13,
      },
    });

    await this.addMarker();
  }

  async addMarker() {
    const marker: Marker = {
      coordinate: {
        lat: this.mockEvent.contacts.coordinates.lat,
        lng: this.mockEvent.contacts.coordinates.long,
      },
      title: this.mockEvent.shortTitle,
      snippet: `${this.mockEvent.contacts.region}, ${this.mockEvent.contacts.address}`,
    };

    await this.map.addMarker(marker);

    await this.map.setOnMarkerClickListener(async () => {
      const modal = await this.modalController.create({
        component: EventMarkerModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.12],
        initialBreakpoint: 0.12,
        showBackdrop: false,
      });

      modal.present();
    });
  }
}
