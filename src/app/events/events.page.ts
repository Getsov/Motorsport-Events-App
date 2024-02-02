import { Component, Input } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { Event } from 'src/shared/interfaces/Event';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {
  parent: string = 'events';
  eventsData: Event[] = [];
  query: any = [];
  private eventsSubscription: Subscription = new Subscription();

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';

  headerTitle: string = 'Събития';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;
  addIcon = 'assets/icon/carbon_add-filled.svg';

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
    private eventService: EventsService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.user = this.authService.getUserFromLocalStorage();
    //this.getEvents();
  }

  getFilteredEvents(event: any): any {
    this.eventsData = event;
  }

  getEvents(): void {
    this.eventsSubscription = this.eventService.getEvents().subscribe({
      next: (events: any) => {
        this.eventsData = events.results;
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

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ionViewDidLeave(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
