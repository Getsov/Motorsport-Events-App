import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Event } from 'src/shared/interfaces/Event';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { EventsService } from 'src/shared/services/events.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  private deleteSubscription: Subscription = new Subscription();
  private eventsSubscription: Subscription = new Subscription();
  @Input() event!: Event;
  @Output() filteredEvents = new EventEmitter<any>();

  location = 'assets/icon/mdi_location.svg';
  date = 'assets/icon/date-icon.svg';
  myEventLineText = 'Мое събитие';

  user: User | null = {
    email: '',
    firstName: '',
    lastName: '',
    region: '',
    role: '',
    organizatorName: '',
    phone: '',
    isDeleted: false,
    isApproved: false,
  };

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  constructor(
    private authService: AuthService,
    private eventService: EventsService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserFromLocalStorage();
  }

  deleteEvent(event: Event): void {
    const confirmation = confirm('Are you sure you want to delete this event?');

    if (confirmation) {
      event.isDeleted = true;
      this.deleteSubscription = this.eventService
        .deleteEvent(event, event._id)
        .subscribe({
          next: () => {
            this.getEvents();
          },
          error: (err) => {
            this.toasterMessage = err.error.error;
            this.toasterType = 'error';

            setTimeout(() => {
              this.resetToasters();
            }, 5000);
          },
        });
    }
  }

  getEvents() {
    this.eventsSubscription = this.eventService.getEvents().subscribe({
      next: (events) => {
        this.filteredEvents.emit(events);
      },
      error: (err) => {
        this.toasterMessage = err.error.error;
        this.toasterType = 'error';

        setTimeout(() => {
          this.resetToasters();
        }, 5000);
      },
    });
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

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ionViewDidLeave(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
