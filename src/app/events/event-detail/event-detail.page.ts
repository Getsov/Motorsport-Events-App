import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  mockEvent: Event = {
    shortTitle: 'Драг Рейсинг на Кондофрей',
    longTitle: '"Кондофрей Драг 2023" - село Кондофрей, летище "София-Запад"',
    imageUrl:
      'https://i.ytimg.com/vi/t52ovr-qdB0/maxresdefault.jpg',
    shortDescription: 'Драг Рейсинг - Кондофрей [29-30 Април]',
    longDescription: `Събитието ще се проведе на познатата ни писта на летище Sofia West Airport, с. Кондофрей до гр. Радомир.
    Вход: 20лв - Такса свободни стартове: 50лв - Такса участие: 60лв`,
    dates: [
      { date: '29.04.2023', startTime: '9:00', endTime: '19:30' },
      { date: '30.04.2023', startTime: '10:00', endTime: '16:30' },
    ],
    contacts: {
      region: 'Кондофрей',
      address: 'София Уест Еърпорт',
      phone: '0888888888',
      email: 'kondofrey@abv.bg',
      coordinates: { lat: 42.448154, long: 22.963561 },
    },
    category: 'Драг',
    creator: 'Drag Racing Bulgaria',
    _id: '01',
    isDeleted: false,
    likedCount: 2,
    visitorPrices: [{price: 5, description: 'За всички'}],
    participantPrices: [{price: 25, description: 'За всички'}],
  };
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
      snippet: `${this.mockEvent.contacts.region}, ${this.mockEvent.contacts.address}`
    };

    await this.map.addMarker(marker);
    
    await this.map.setOnMarkerClickListener(async () => {
      const modal = await this.modalController.create({
        component: EventMarkerModalPage,
        componentProps: {
          marker
        },
        breakpoints: [0, 0.12],
        initialBreakpoint: 0.12,
        showBackdrop: false
      });

      modal.present();
    })
  }
}
