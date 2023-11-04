import {
  Component,
  OnInit,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicSlides } from '@ionic/angular';
import { CommonModule } from '@angular/common';
register();

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() upcomingEvents: any[] = [];
  swiperModule = [IonicSlides];

  constructor() {}
  // TODO: redirect to  details page of the selected event
  // TODO: add events interface
  // TODO: attach like functionality to like icon, _id is passed

  ngOnInit() {}
}
