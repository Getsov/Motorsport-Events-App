import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/shared/interfaces/Category';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private eventsSubscription: Subscription = new Subscription();

  eventsData: Event[] = [];
  constructor(private eventService: EventsService) {}

  categories: Category[] = [];

  ionViewWillEnter() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsSubscription = this.eventService.getEvents().subscribe({
      next: (events: Event[]) => {
        this.eventsData = events;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ionViewDidLeave(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
