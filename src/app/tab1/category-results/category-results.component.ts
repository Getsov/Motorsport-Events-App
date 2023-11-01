import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-results',
  templateUrl: './category-results.component.html',
  styleUrls: ['./category-results.component.scss'],
})
export class CategoryResultsComponent implements OnInit {
  eventType: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.eventType = this.activatedRoute.snapshot.params['eventType'];
  }

  // TODO: fetch data based on filter

  events: any = [
    {
      title: 'Рали спринт Пампорово 2023',
      date: '18/11/2023',
      description:
        'Финален кръг от шампионата по рали спринт за 2023 г. Отсечките се провеждат около Пампорово, тази година има суперспециален етап в Смолян.',
      location: 'Пампорово - Смолян',
      type: 'Rally',
    },
    {
      title: 'SoDrift Sofia final',
      date: '18/11/2023',
      description:
        'Четвърти и финален кръг от дрифт шампионата, ще се проведе на паркинга на хипермаркет Метро 2 в София.',
      location: 'София, Метро 2',
      type: 'Drift',
    },
  ];

  ngOnInit() {}
}
