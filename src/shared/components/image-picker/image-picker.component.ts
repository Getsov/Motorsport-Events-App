import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onImageSelect() {
    console.log('dada');
  }
}
