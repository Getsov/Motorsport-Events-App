import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: Event[] = [];
  @Input() loadEventsCount: number = 5;

  @Input() titleText: string = 'Предстоящи събития';
  @Input() titleColor: string = 'orange';

  pageToLoad: number = 1;
  isAllEventsLoaded: boolean = false;

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService
      .getPaginationEvents(this.pageToLoad, this.loadEventsCount)
      .subscribe({
        next: (response) => {
          this.upcomingEvents = response.results;
          console.log(this.upcomingEvents);

          console.log(this.pageToLoad);
          this.pageToLoad++;
        },
        error: (error) => console.log(error),
      });
  }

  swiperSlideChanged(e: any) {
    let activeIndex = e.detail[0].activeIndex;

    // Add a flag to track whether all events have been loaded
    // Load more events 2 dots before the end.
    if (
      !this.isAllEventsLoaded &&
      this.upcomingEvents.length - activeIndex == 3
    ) {
      this.eventService
        .getPaginationEvents(this.pageToLoad, this.loadEventsCount)
        .subscribe({
          next: (response) => {
            if (response.nextPage) {
              this.upcomingEvents.push(...response.results);
              console.log(this.upcomingEvents);
              console.log(this.pageToLoad);
              this.pageToLoad++;
            } else {
              // Set the flag if no more events are available
              this.isAllEventsLoaded = true;
            }
          },
          error: (error) => console.log(error),
        });
    }
  }
}
