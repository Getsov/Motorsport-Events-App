import { Component, OnInit } from '@angular/core';
import { Category } from 'src/shared/interfaces/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}

  categories: Category[] = [];

  ngOnInit() {
    this.categories = [
      {
        type: 'Драг',
        imageUrl: '../../assets/icon/category-icons/drag.png',
      },
      {
        type: 'Дрифт',
        imageUrl: '../../assets/icon/category-icons/drift.png',
      },
      {
        type: 'Писта',
        imageUrl: '../../assets/icon/category-icons/pista.png',
      },
      {
        type: 'Планинско',
        imageUrl: '../../assets/icon/category-icons/mountain.png',
      },
      {
        type: 'Тайм Атак',
        imageUrl: '../../assets/icon/category-icons/time-track.png',
      },
      {
        type: 'Рали',
        imageUrl: '../../assets/icon/category-icons/rally.png',
      },
      {
        type: 'Мотори',
        imageUrl: '../../assets/icon/category-icons/bikes.png',
      },
      {
        type: 'Събори',
        imageUrl: '../../assets/icon/category-icons/meetings.png',
      },
    ];
  }
}
