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
  @Input() likedCount: number = 0;

  likeIconSrc: string = '../../../assets/icon/like-icons/not-liked-small.svg';
  isLiked: boolean = false;
  fontSize: string = '10px';

  ngOnInit() {
    // Check if is liked and set the boolean.
    this.isLiked = false;

    // configurate icon
    if (this.likedCount < 10) {
      this.fontSize = '10px';

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/small-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-small.svg');
    } else if (this.likedCount < 100) {
      this.fontSize = '12px';

      this.isLiked
        ? (this.likeIconSrc =
            '../../../assets/icon/like-icons/medium-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-medium.svg');
    } else if (this.likedCount < 1000) {
      this.fontSize = '14px';

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/large-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-large.svg');
    }
  }

  likeEvent() {
    this.isLiked = !this.isLiked;
    this.likedCount++;

    if (this.likedCount < 10) {
      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/small-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-small.svg');
    } else if (this.likedCount < 100) {
      if (this.likedCount === 10) {
        this.fontSize = '12px';
      }

      this.isLiked
        ? (this.likeIconSrc =
            '../../../assets/icon/like-icons/medium-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-medium.svg');
    } else if (this.likedCount < 1000) {
      if (this.likedCount === 10) {
        this.fontSize = '14px';
      }

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/large-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-large.svg');
    }

    // Send a request to like the event using the eventId
  }
}
