import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController, NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { getDayOfWeek } from 'src/shared/utils/date-utils';
import { EventMarkerModalPage } from './event-marker-modal/event-marker-modal.page';
import { EventsService } from 'src/shared/services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit, OnDestroy {
  Subscriptions$: Subscription[] = [];
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;

  headerTitle: string = 'Детайли за събитие';
  defaultHref: string = '/tabs/events';
  backButton: boolean = true;

  eventId: string = '';

  event: Event = {
    shortTitle: '',
    shortDescription: '',
    longDescription: '',
    visitorPrices: [],
    dates: [],
    imageUrl: '',
    contacts: {
      coordinates: {
        lat: 0,
        lng: 0,
      },
      region: '',
      address: '',
      phone: '',
      email: '',
    },
    categories: [],
    likes: [],
    creator: { email: '', role: '', isDeleted: false, isApproved: false },
    isApproved: false,
    isDeleted: false,
    _id: '',
  };

  titleSeparatorColor: string = 'orange';

  infoSeparatorText: string = 'Информация за събитието';
  infoSeparatorColor: string = 'yellow';

  errorMessage: string = '';
  getDayOfWeek = getDayOfWeek;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    private eventService: EventsService
  ) {}

  ngOnInit() {
    this.Subscriptions$.push(
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has('eventId')) {
          this.navController.navigateBack('/tabs/events');
          return;
        }
        this.eventId = paramMap.get('eventId')!;
      })
    );

    this.Subscriptions$.push(this.setEvent());
  }
  setEvent(): Subscription {
    return this.eventService.getEvent(this.eventId).subscribe({
      next: (response) => {
        this.event = response;
        this.createMap();
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  addEventToFavourites() {
    // TODO: add event to favourites via service
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: this.event._id,
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: Number(this.event.contacts.coordinates.lat),
          lng: Number(this.event.contacts.coordinates.lng),
        },
        zoom: 13,
      },
    });

    await this.addMarker();
  }

  async addMarker() {
    const marker: Marker = {
      coordinate: {
        lat: Number(this.event.contacts.coordinates.lat),
        lng: Number(this.event.contacts.coordinates.lng),
      },
      title: this.event.shortTitle,
      snippet: `${this.event.contacts.region}, ${this.event.contacts.address}`,
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

  ngOnDestroy(): void {
    for (const subscription of this.Subscriptions$) {
      subscription.unsubscribe();
    }
  }
}
