import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/shared/interfaces/Event';
import { AuthService } from 'src/shared/services/auth.service';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit, OnDestroy {
  Subscriptions$: Subscription[] = [];
  @Input() upcomingEvents: Event[] = [];
  @Input() loadEventsCount: number = 10;

  @Input() titleText: string = 'Предстоящи събития';
  @Input() titleColor: string = 'orange';

  pageToLoad: number = 1;
  isAllEventsLoaded: boolean = false;
  isAdminOrOrganization: boolean = false;

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  addIcon = 'assets/icon/carbon_add-filled.svg';

  constructor(
    private eventService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.Subscriptions$.push(this.loadEvents());

    // check if user is admin or organizer to show create event button
    this.Subscriptions$.push(
      this.authService.userData$.subscribe({
        next: (userData) => {
          this.isAdminOrOrganization =
            userData?.role === 'organizer' || userData?.role === 'admin';
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

  private loadEvents() {
    return this.eventService
      .getPaginationEvents(this.pageToLoad, this.loadEventsCount)
      .subscribe({
        next: (response) => {
          this.upcomingEvents = response.results;
          this.pageToLoad++;
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

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ngOnDestroy(): void {
    for (const subscription$ of this.Subscriptions$) {
      subscription$.unsubscribe();
    }
  }
}
