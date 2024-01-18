import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController, NavController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { getDayOfWeek } from 'src/shared/utils/date-utils';
import { EventMarkerModalPage } from './event-marker-modal/event-marker-modal.page';
import { EventsService } from 'src/shared/services/events.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import { ConfirmModalComponent } from 'src/shared/components/confirm-modal/confirm-modal.component';

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
  eventLikes: string[] = [];
  userId: string = '';
  hasLiked: boolean = false;

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

  isCreatorOrAdmin: boolean | undefined = false;

  titleSeparatorColor: string = 'orange';

  infoSeparatorText: string = 'Информация за събитието';
  infoSeparatorColor: string = 'yellow';

  errorMessage: string = '';
  getDayOfWeek = getDayOfWeek;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    private eventService: EventsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.Subscriptions$.push(this.getEventId());

    this.Subscriptions$.push(this.setEvent());

    this.eventService.event$.subscribe({
      next: (event) => {
        event ? (this.eventLikes = event.likes) : (this.eventLikes = []);
        this.hasLiked = this.event.likes.includes(this.userId);
      },
    });
    this.Subscriptions$.push(this.creatorAdminChecker());
  }

  // load event details
  setEvent(): Subscription {
    return this.eventService.getEvent(this.eventId).subscribe({
      next: (response) => {
        this.event = response;
        this.hasLiked = this.event.likes.includes(this.userId);
        this.createMap();
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  // check if user is the creator or admin so he can edit/delete
  creatorAdminChecker(): Subscription {
    return this.authService.userData$.subscribe({
      next: (userData) => {
        this.isCreatorOrAdmin = userData?.createdEvents.includes(this.eventId);

        if (userData?._id) {
          this.userId = userData?._id;
        }
      },
    });
  }

  // get event id
  getEventId(): Subscription {
    return this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId')) {
        this.navController.navigateBack('/tabs/events');
        return;
      }
      this.eventId = paramMap.get('eventId')!;
    });
  }

  addRemoveFromFavorites() {
    this.Subscriptions$.push(
      this.eventService.likeUnlikeEvent(this.eventId, this.userId).subscribe({
        next: (response: string) => {
          if (response === 'Event UnLiked!') {
            this.hasLiked = false;
          } else {
            this.hasLiked = true;
          }
        },
      })
    );
  }

  onEditEvent() {
    this.router.navigate(['/tabs/events/edit', this.eventId]);
  }

  // open delete modal and pass the id for deleting
  async presentDeleteModal(modalType: string) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { eventId: this.event._id, modalType },
      cssClass: 'confirm-modal',
    });

    await modal.present();
  }

  // initiate google map
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
