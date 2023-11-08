import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-fades',
  templateUrl: './title-fades.component.html',
  styleUrls: ['./title-fades.component.scss'],
})
export class TitleFadesComponent implements OnInit {
  constructor() {}

  @Input() color: string = '';

  isYellow: boolean = false;
  isOrange: boolean = false;

  ngOnInit() {
    if (this.color == 'yellow') {
      this.isYellow = true;
      this.isOrange = false;
    } else if (this.color == 'orange') {
      this.isOrange = true;
      this.isYellow = false;
    }
  }
}
