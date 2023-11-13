// like-icon.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-like-icon',
  templateUrl: './like-icon.component.html',
  styleUrls: ['./like-icon.component.scss'],
})
export class LikeIconComponent implements OnInit {
  constructor() {}

  @Input() eventId: string = '';
  @Input() likesCount: number = 0;

  likeIconSrc: string = '../../../assets/icon/like-icons/not-liked-small.png';
  isLiked: boolean = false;
  fontSize: string = '10px';

  ngOnInit() {}

  likeEvent() {
    this.isLiked = !this.isLiked;
    this.likesCount++;

    if (this.likesCount < 10) {
      this.likeIconSrc =
        this.likeIconSrc ===
        '../../../assets/icon/like-icons/not-liked-small.png'
          ? '../../../assets/icon/like-icons/small-liked.png'
          : '../../../assets/icon/like-icons/not-liked-small.png';
    } else if (this.likesCount < 100) {
      if (this.likesCount === 10) {
        this.fontSize = '12px';
        console.log('fontsizre changed');
      }
      this.likeIconSrc =
        this.likeIconSrc ===
        '../../../assets/icon/like-icons/not-liked-medium.png'
          ? '../../../assets/icon/like-icons/medium-liked.png'
          : '../../../assets/icon/like-icons/not-liked-medium.png';
    } else if (this.likesCount < 1000) {
      this.likeIconSrc =
        this.likeIconSrc ===
        '../../../assets/icon/like-icons/not-liked-large.png'
          ? '../../../assets/icon/like-icons/large-liked.png'
          : '../../../assets/icon/like-icons/not-liked-large.png';
    }

    // Send a request to like the event using the eventId
    // if is liked unlike it, if is not liked - like it.

    console.log(`Liked event with ID: ${this.eventId}`);
  }
}
