import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-price',
  templateUrl: './select-price.component.html',
  styleUrls: ['./select-price.component.scss'],
})
export class SelectPriceComponent implements OnInit {
  @Input() visitorPrices!: { price: string | number; description: string }[];
  @Input() visitorError: any = false;
  @Input() participantPrices!: {
    price: string | number;
    description: string;
  }[];
  @Input() participantError: any = false;

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

  isPriceValid(price: string | number): boolean {
    const regex = /^0$|^[1-9][0-9]*$/;
    return regex.test(price.toString());
  }
}
