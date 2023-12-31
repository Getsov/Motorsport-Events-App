import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePicked = new EventEmitter<string>();
  @Input() imageErrorMessage: string = '';
  selectedImage: string = '';

  constructor() {}

  ngOnInit() {}

  async onAttachPictureClick() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image) {
      this.imagePicked.emit(image.webPath!);
      this.savePicture(image);
    }
  }

  async savePicture(photo: Photo) {
    this.selectedImage = photo.webPath!;
    this.imageErrorMessage = '';
  }

  onDiscardSelectedImage(): void {
    this.imagePicked.emit();
    this.selectedImage = '';
  }
}
