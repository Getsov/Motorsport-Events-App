import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  @Input() titleColor = 'orange';
  @Input() titleText = 'За нас';

  constructor() {}

  ngOnInit() {}
}
