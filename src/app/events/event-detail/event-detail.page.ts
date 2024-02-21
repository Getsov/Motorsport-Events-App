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
import { Categories } from 'src/shared/data/categories';
import BulgarianRegions from 'src/shared/data/regions';

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
  toasterMessage: string = '';
  toasterType: string = '';

  event: Event = {
    shortTitle: '',
    shortDescription: '',
    longDescription: '',
    visitorPrices: [],
    participantPrices: [],
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

  isLoading: boolean = false;
  isCreatorOrAdmin: boolean | undefined = false;

  titleSeparatorColor: string = 'orange';

  infoSeparatorText: string = 'Информация за събитието';
  infoSeparatorColor: string = 'yellow';

  errorMessage: string = '';
  getDayOfWeek = getDayOfWeek;

  categories: any = Object.entries(Categories).filter(
    (entry) => typeof entry[1] === 'string'
  );

  regions: any = Object.entries(BulgarianRegions).filter(
    (entry) => typeof entry[1] === 'string'
  );

  categoriesMap: Map<string, string> = new Map();
  regionsMap: Map<string, string> = new Map();

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    private eventService: EventsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.categoriesMap = new Map(
      this.categories.map((item: any[]) => [item[1], item[0]])
    );

    this.regionsMap = new Map(
      this.regions.map((item: any[]) => [item[1], item[0]])
    );
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
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
        this.isLoading = false;
        this.event = response;
        this.event.participantPrices = this.event.participantPrices?.filter(
          (price) => price.description && price.price
        );
        this.hasLiked = this.event.likes.includes(this.userId);

        // needed to be set inside timeout, otherwise maps throws error
        setTimeout(() => {
          this.createMap();
        }, 100);
      },
      error: (error) => {
        this.toasterMessage = error.error.error;
        this.toasterType = 'error';

        setTimeout(() => {
          this.resetToasters();
        }, 5000);
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

            this.toasterMessage = 'Успешно премахнахте събитието от любими!';
            this.toasterType = 'success';
          } else {
            this.hasLiked = true;

            this.toasterMessage = 'Успешно добавихте събитието в любими!';
            this.toasterType = 'success';
          }
        },
        error: (err) => {
          this.toasterMessage = err.error.error;
          this.toasterType = 'error';

          setTimeout(() => {
            this.resetToasters();
          }, 5000);
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
      snippet: `${this.event.contacts.address}`,
    };

    await this.map.addMarker(marker);

    await this.map.setOnMarkerClickListener(async () => {
      const modal = await this.modalController.create({
        component: EventMarkerModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0.15],
        initialBreakpoint: 0.15,
        showBackdrop: false,
      });

      modal.present();
    });
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ngOnDestroy(): void {
    for (const subscription of this.Subscriptions$) {
      subscription.unsubscribe();
    }
  }
}
