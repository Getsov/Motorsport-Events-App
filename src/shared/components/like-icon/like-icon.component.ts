// like-icon.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-like-icon',
  templateUrl: './like-icon.component.html',
  styleUrls: ['./like-icon.component.scss'],
})
export class LikeIconComponent implements OnInit, OnDestroy {
  likeSubscription$?: Subscription;

  @Input() eventId: string = '';

  @Input() likes: string[] = [];
  @Input() userId?: string = '';

  constructor(private eventService: EventsService, private router: Router) {}

  likeIconSrc: string = '../../../assets/icon/like-icons/not-liked-small.svg';
  isLiked: boolean = false;
  fontSize: string = '10px';

  ngOnInit() {
    // Check if is liked and set the boolean.
    if (this.userId) {
      this.isLiked = this.likes.includes(this.userId);
    }

    // configurate icon
    if (this.likes.length < 10) {
      this.fontSize = '10px';

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/small-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-small.svg');
    } else if (this.likes.length < 100) {
      this.fontSize = '12px';

      this.isLiked
        ? (this.likeIconSrc =
            '../../../assets/icon/like-icons/medium-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-medium.svg');
    } else if (this.likes.length < 1000) {
      this.fontSize = '14px';

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/large-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-large.svg');
    }
  }

  likeUnlikeEvent() {
    if (!this.userId) {
      this.router.navigateByUrl('tabs/user/auth');
      return;
    }
    this.isLiked = !this.isLiked;

    this.likeSubscription$ = this.eventService
      .likeUnlikeEvent(this.eventId)
      .subscribe({
        next: (response: string) => {
          if (response === 'Event UnLiked!') {
            this.likes.length--;
            this.isLiked = true;
          } else {
            this.likes.length++;
            this.isLiked = false;
          }
          this.isLiked = !this.isLiked;
        },
      });

    if (this.likes.length < 10) {
      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/small-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-small.svg');
    } else if (this.likes.length < 100) {
      if (this.likes.length === 10) {
        this.fontSize = '12px';
      }

      this.isLiked
        ? (this.likeIconSrc =
            '../../../assets/icon/like-icons/medium-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-medium.svg');
    } else if (this.likes.length < 1000) {
      if (this.likes.length === 10) {
        this.fontSize = '14px';
      }

      this.isLiked
        ? (this.likeIconSrc = '../../../assets/icon/like-icons/large-liked.svg')
        : (this.likeIconSrc =
            '../../../assets/icon/like-icons/not-liked-large.svg');
    }

    // Send a request to like the event using the eventId
  }

  ngOnDestroy(): void {
    if (this.likeSubscription$) {
      this.likeSubscription$.unsubscribe();
    }
  }
}
