import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-marker-modal',
  templateUrl: './event-marker-modal.page.html',
  styleUrls: ['./event-marker-modal.page.scss'],
})
export class EventMarkerModalPage implements OnInit {
  @Input() marker: any;

  constructor() { }

  ngOnInit() {
    // console.log(this.event)
  }

}
