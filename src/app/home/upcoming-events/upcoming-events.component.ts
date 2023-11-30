import { Component, OnInit, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Event } from 'src/shared/interfaces/Event';
import { EventsService } from 'src/shared/services/events.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: Event[] = [];

  @Input() titleText: string = 'Предстоящи събития';
  @Input() titleColor: string = 'orange';

  swiperModule = [IonicSlides];

  constructor(private eventService: EventsService) {}

  ngOnInit() {}
}
