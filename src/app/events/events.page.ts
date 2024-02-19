import { Component, Input, ViewChild } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { SearchComponent } from 'src/shared/components/search/search.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {
  parent: string = 'events';
  eventsData: Event[] = [];
  query: any = [];

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  private eventsSubscription: Subscription = new Subscription();

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';

  isLoading: boolean = false;

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

  constructor(private authService: AuthService) {}

  ionViewWillEnter() {
    this.user = this.authService.getUserFromLocalStorage();
    this.searchComponent.loadEventsBasedOnRoute();
  }

  getFilteredEvents(event: any): any {
    this.eventsData = event;
  }

  setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ionViewDidLeave(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }

    // lifecycle hooks inside SearchComponent are not triggered
    // unsubscribe from SearchComponent subscriptions
    if (this.searchComponent.eventsSubscription) {
      this.searchComponent.eventsSubscription.unsubscribe();
    }
  }
}
