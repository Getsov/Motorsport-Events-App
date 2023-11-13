import { Component, OnInit, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { ShortenedEvent } from 'src/shared/interfaces/ShortenedEvent';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: ShortenedEvent[] = [];

  @Input() titleText: string = 'Предстоящи събития';
  @Input() titleColor: string = 'orange';

  swiperModule = [IonicSlides];

  constructor() {}
  // TODO: redirect to  details page of the selected event
  // TODO: add events interface

  ngOnInit() {}
}
