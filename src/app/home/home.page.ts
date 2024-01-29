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

  ngOnInit() {}
}
