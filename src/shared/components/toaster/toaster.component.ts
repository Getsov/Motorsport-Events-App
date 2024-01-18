import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  @Input() toasterType: string = '';
  @Input() toasterMessage: string = '';

  constructor() {}

  ngOnInit() {}

  setOpen() {
    this.toasterMessage = '';
  }
}
