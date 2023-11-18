import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() titleColor: string = 'orange';
  @Input() titleText: string = 'Филтриране на събития';
  Category: string = 'Категория';
  Location: string = 'Локация';
  constructor() {}

  ngOnInit() {}
}
