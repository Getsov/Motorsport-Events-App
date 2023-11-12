import { Component, OnInit, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: any[] = [];

  //  We set default values on titleText and titleColor.
  // If data is passed they will change its value.
  @Input() titleText: string = 'Предстоящи събития';
  @Input() titleColor: string = 'orange';

  swiperModule = [IonicSlides];

  constructor() {}
  // TODO: redirect to  details page of the selected event
  // TODO: add events interface
  // TODO: attach like functionality to like icon, _id is passed

  ngOnInit() {}
}
