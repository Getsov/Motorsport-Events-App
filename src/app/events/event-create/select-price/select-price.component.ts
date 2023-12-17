import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-price',
  templateUrl: './select-price.component.html',
  styleUrls: ['./select-price.component.scss'],
})
export class SelectPriceComponent implements OnInit {
  visitorPrices = [{ price: 0, description: '' }];
  participantPrices = [{ price: 0, description: '' }];

  constructor() {}

  ngOnInit() {}

  addVisitorPrice() {
    this.visitorPrices.push({ price: 0, description: '' });
  }

  removeVisitorPrice(index: number) {
    if (this.visitorPrices.length > 1) {
      this.visitorPrices.splice(index, 1);
    }
  }

  addParticipantPrice() {
    this.participantPrices.push({ price: 0, description: '' });
  }

  removeParticipantPrice(index: number) {
    if (this.participantPrices.length > 1) {
      this.participantPrices.splice(index, 1);
    }
  }
}
