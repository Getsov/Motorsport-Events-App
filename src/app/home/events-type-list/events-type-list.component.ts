import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/shared/interfaces/Category';

@Component({
  selector: 'app-events-type-list',
  templateUrl: './events-type-list.component.html',
  styleUrls: ['./events-type-list.component.scss'],
})
export class EventsTypeListComponent implements OnInit {
  @Input() eventsType: Category[] = [];

  //  We set default values on titleText and titleColor.
  // If data is passed they will change its value.
  @Input() titleColor = 'yellow';
  @Input() titleText = 'Категории';

  constructor() {}

  // TODO: redirect to eventsList and pass the selected filter(type of the event)
  ngOnInit() {}
}
