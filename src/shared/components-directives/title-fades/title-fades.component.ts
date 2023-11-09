import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-fades',
  templateUrl: './title-fades.component.html',
  styleUrls: ['./title-fades.component.scss'],
})
export class TitleFadesComponent implements OnInit {
  constructor() {}

  @Input() color: string = '';
  @Input() title: string = '';

  ngOnInit() {}
}
