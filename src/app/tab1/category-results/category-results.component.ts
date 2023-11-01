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

  ngOnInit() {}
}
