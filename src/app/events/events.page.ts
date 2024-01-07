import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { Event } from 'src/shared/interfaces/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  eventsData: Event[] = [];
  query: any = [];

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';

  headerTitle: string = 'Събития';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;

  constructor(
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEvents(); // Call getEvents in ngOnInit
  }

  getFilteredEvents(event: any): any {
    this.eventsData = event;
  }

  getEvents(): void {
    const sortBy = this.activatedRoute.snapshot.queryParams['sortBy'] || '';
    let query = '';
    if (sortBy) {
      query = `category=${sortBy}`;
    }
    this.eventService.getEvents(query).subscribe({
      next: (events: Event[]) => {
        this.eventsData = events;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
