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
  ngOnInit() {}

  likeEvent() {
    this.likeIconSrc =
      this.likeIconSrc === '../../../assets/icon/like-icons/not-liked-small.png'
        ? '../../../assets/icon/like-icons/small-liked.png'
        : '../../../assets/icon/like-icons/not-liked-small.png';

    this.isLiked = !this.isLiked;

    // Send a request to like the event using the eventId
    // if is liked unlike it, if is not liked - like it.

    console.log(`Liked event with ID: ${this.eventId}`);
  }
}
