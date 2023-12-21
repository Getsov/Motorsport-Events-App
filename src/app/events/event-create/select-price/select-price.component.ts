import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-price',
  templateUrl: './select-price.component.html',
  styleUrls: ['./select-price.component.scss'],
})
export class SelectPriceComponent implements OnInit {
  @Input() visitorPrices!: { price: string; description: string }[];
  @Input() participantPrices!: { price: string; description: string }[];

  constructor() {}

  ngOnInit() {}

  addVisitorPrice() {
    this.visitorPrices.push({ price: '', description: '' });
  }

  removeVisitorPrice(index: number) {
    if (this.visitorPrices.length > 1) {
      this.visitorPrices.splice(index, 1);
    }
  }

  addParticipantPrice() {
    this.participantPrices.push({ price: '', description: '' });
  }

  removeParticipantPrice(index: number) {
    if (this.participantPrices.length > 1) {
      this.participantPrices.splice(index, 1);
    }
  }
}
