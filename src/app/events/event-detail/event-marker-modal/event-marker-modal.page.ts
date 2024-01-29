import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-marker-modal',
  templateUrl: './event-marker-modal.page.html',
  styleUrls: ['./event-marker-modal.page.scss'],
})
export class EventMarkerModalPage {
  @Input() marker: any;

  constructor() {}
}
