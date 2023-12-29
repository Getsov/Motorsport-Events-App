import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selectedImage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  async onAttachPictureClick() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64, 
      source: CameraSource.Photos,
    });

    if (image) {
      this.savePicture(image);
      this.uploadImage(image);
    }
  }

  async savePicture(photo: Photo) {
    this.selectedImage = photo.webPath!;
  }

  onDiscardSelectedImage(): void {
    this.selectedImage = '';
    console.log(this.selectedImage);
  }
  
  async uploadImage(photo: Photo) {
    const formData = new FormData();
    formData.append('image', photo.base64String!);

    this.http.post('http://localhost:3030/events/register', formData).subscribe(
      (response) => {
        // Handle success if needed
        console.log('Image uploaded successfully', response);
      },
      (error) => {
        // Handle error if needed
        console.error('Error uploading image', error);
      }
    );
  }
}
