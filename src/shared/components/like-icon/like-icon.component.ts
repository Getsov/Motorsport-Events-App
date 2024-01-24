// like-icon.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-like-icon',
  templateUrl: './like-icon.component.html',
  styleUrls: ['./like-icon.component.scss'],
})
export class LikeIconComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];

  @Input() eventId: string = '';
  @Input() likes: string[] = [];
  @Input() isLiked: boolean = false;
  @Input() userId: string = '';
  @Input() source: string = '';

  toasterMessage: string = '';
  toasterType: string = '';

  constructor(
    private eventService: EventsService,
    private router: Router,
    private authService: AuthService
  ) {}

  likeIconSrc: string = '../../../assets/icon/like-icons/not-liked-small.svg';
  fontSize: string = '10px';

  ngOnInit() {
    // Get user id and check if he has liked
    this.authService.userData$.subscribe(
      (userData) => (this.userId = userData ? userData?._id : '')
    );

    // if it has source this means it comes from the event details component
    if (this.source) {
      this.eventService.event$.subscribe({
        next: (eventData) => {
          if (eventData?.likes) {
            this.likes = eventData.likes;
            this.isLiked = this.likes.includes(this.userId);
            this.likeIconSwitcher();
          } else {
            this.userId = '';
          }
        },
        error: (err) => console.log(err.error),
      });
    } else {
      this.isLiked = this.likes.includes(this.userId);
      this.likeIconSwitcher();
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

    // like or unlike event
    this.subscriptions$.push(
      this.eventService.likeUnlikeEvent(this.eventId, this.userId).subscribe({
        next: (response: string) => {
          //  if it does have a source this means the like comes from event detail page
          if (!this.source) {
            if (response === 'Event UnLiked!') {
              this.isLiked = false;
              const indexToRemove = this.likes.indexOf(this.userId);
              this.likes.splice(indexToRemove, 1);

              this.toasterMessage = 'Успешно премахнахте събитието от любими!';
              this.toasterType = 'success';
            } else {
              this.isLiked = true;
              this.likes.push(this.userId);

              this.toasterMessage = 'Успешно добавихте събитието в любими!';
              this.toasterType = 'success';
            }
          } else {
            if (response === 'Event UnLiked!') {
              this.toasterMessage = 'Успешно премахнахте събитието от любими!';
              this.toasterType = 'success';
            } else {
              this.toasterMessage = 'Успешно добавихте събитието в любими!';
              this.toasterType = 'success';
            }
          }
          this.likeIconSwitcher();
        },
      })
    );
  }

  // change like icon based on likes count and if liked
  likeIconSwitcher() {
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
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions$) {
      subscription.unsubscribe();
    }
  }
}
