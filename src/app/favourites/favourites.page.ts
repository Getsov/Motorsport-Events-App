import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { Event } from 'src/shared/interfaces/Event';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {
  parent: string = 'favourites';
  favouritesData: Event[] = [];
  query: any = [];
  private favouritesSubscription: Subscription = new Subscription();

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';

  headerTitle: string = 'Любими';
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

  ionViewWillEnter(): void {
    this.user = this.authService.getUserFromLocalStorage();
    this.getEvents();
  }

  getFilteredEvents(event: any): any {
    this.favouritesData = event;
  }

  getEvents(): void {
    this.favouritesSubscription = this.eventService
      .getMyFavourites()
      .subscribe({
        next: (events: Event[]) => {
          this.favouritesData = events;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  ionViewDidLeave(): void {
    if (this.favouritesSubscription) {
      this.favouritesSubscription.unsubscribe();
    }
  }
}
