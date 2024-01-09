import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-line',
  templateUrl: './event-line.component.html',
  styleUrls: ['./event-line.component.scss'],
})
export class EventLineComponent  implements OnInit {
  @Input() inputString!: string;
  constructor() { }

  ngOnInit() {}

}
