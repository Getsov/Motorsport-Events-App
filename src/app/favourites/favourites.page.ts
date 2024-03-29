import { Component, Input, ViewChild } from '@angular/core';
import { EventsService } from '../../shared/services/events.service';
import { Event } from 'src/shared/interfaces/Event';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { SearchComponent } from 'src/shared/components/search/search.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {
  parent: string = 'favourites';
  favouritesData: Event[] = [];
  query: any = [];

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  private favouritesSubscription: Subscription = new Subscription();

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';

  isLoading: boolean = false;

  headerTitle: string = 'Любими';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;
  addIcon = 'assets/icon/carbon_add-filled.svg';

  unlikedEvent: any;

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

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  constructor(
    private eventService: EventsService,
    private authService: AuthService
  ) {
    // when unlikedEvent subject is changed this means an event is unliked => show toaster
    // this was needed because upon unlike the event do not exist on the page and toaster was not showing
    this.eventService.unlikedEvent$.subscribe({
      next: (eventId) => {
        if (eventId) {
          this.toasterMessage = 'Успешно премахнахте събитието от любими!';
          this.toasterType = 'success';

          setTimeout(() => {
            this.resetToasters();
          }, 5000);
        }
      },
    });
  }

  ionViewWillEnter(): void {
    this.user = this.authService.getUserFromLocalStorage();
    this.searchComponent.loadEventsBasedOnRoute();
  }

  setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  getFilteredEvents(event: any): any {
    this.favouritesData = event;
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ionViewDidLeave(): void {
    if (this.favouritesSubscription) {
      this.favouritesSubscription.unsubscribe();
    }

    // lifecycle hooks inside SearchComponent are not triggered
    // unsubscribe from SearchComponent subscriptions
    if (this.searchComponent.eventsSubscription) {
      this.searchComponent.eventsSubscription.unsubscribe();
    }
  }
}
