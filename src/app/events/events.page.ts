import { Component, Input, OnInit } from '@angular/core';
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
export class EventsPage implements OnInit {
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
    isApproved: true,
  };

  constructor(
    private eventService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEvents();
    this.user = this.authService.getUserFromLocalStorage();
  }

  // this works when edited/deleted event goes back to all events - the changes are applied
  // - onInit does not go inside after edit/delete - TODO: decide if oninit is needed here
  ionViewWillEnter() {
    this.getEvents();
  }

  getFilteredEvents(event: any): any {
    this.eventsData = event;
  }

  getEvents(): void {
    this.eventsSubscription = this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        this.eventsData = events;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  ionViewDidLeave(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
