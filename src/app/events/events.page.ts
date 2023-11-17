import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { events } from 'src/shared/data/events';
import { Event } from 'src/shared/interfaces/Event';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  headerTitle: string = 'Събития';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;
  eventsData: Event[] = events;
  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';
  location = "assets/icon/icon-location.svg";
  constructor(private router: Router) { }
  eventRedirect(id: string): void {
    this.router.navigate(['/tabs/events/' + id]);
  }
  ngOnInit() {
  }

}

