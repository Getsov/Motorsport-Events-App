import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
})
export class EventEditPage implements OnInit, OnDestroy {
  getEventSubsription$!: Subscription;
  eventData!: Event;
  error: string = '';

  eventId: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;

    this.getEventSubsription$ = this.eventService
      .getEvent(this.eventId)
      .subscribe({
        next: (eventResponse) => {
          this.eventData = eventResponse;
        },
        error: (err) => (this.error = err.message),
      });
  }

  ngOnDestroy(): void {
    if (this.getEventSubsription$) this.getEventSubsription$.unsubscribe();
  }
}
