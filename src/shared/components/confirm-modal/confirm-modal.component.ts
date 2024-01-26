import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  deleteSubscription$?: Subscription;
  @Input() eventId: string = '';
  @Input() modalType: string = '';

  toasterMessage: string = '';
  toasterType: string = '';

  deleteModalMessage: string =
    'Сигурни ли сте, че искате да изтриете събитието?';
  editMessage: string = 'Сигурни ли сте, че искате да редактирате събитието?';
  editProfileMessage: string =
    'Сигурни ли сте, че искате да редактирате профила?';
  discardMessage: string =
    'Сигурни ли сте, че искате да откажете направените промени?';

  logoutMessage: string =
    'Сигурни ли сте, че искате да излезнете от профила си?';

  createMessage: string = 'Сигурни ли сте, че искате да създадете събитието?';

  constructor(
    private modalController: ModalController,
    private eventService: EventsService,
    private router: Router
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

  async onDoneClick() {
    // modal actions - delete, edit or discard event changes
    switch (this.modalType) {
      case 'delete':
        this.deleteSubscription$ = this.deleteEvent();
        break;
      case 'dismiss':
        this.router.navigateByUrl('/tabs/events');

        this.toasterMessage = 'Успешно отказахте направените промени';
        this.toasterType = 'success';

        await this.modalController.dismiss();
        break;

      case 'edit':
      case 'editProfile':
      case 'create':
      case 'logout':
        await this.modalController.dismiss(true);
        break;

      default:
        break;
    }
  }

  deleteEvent(): Subscription {
    return this.eventService
      .deleteEvent({ isDeleted: true }, this.eventId)
      .subscribe({
        next: () => {
          this.toasterMessage = 'Успешно изтрито събитие';
          this.toasterType = 'success';

          this.router.navigateByUrl('/');
          this.modalController.dismiss();
        },
        error: (err) => {
          this.toasterType = 'error';
          this.toasterMessage = err.error.error;

          this.resetToasters();
        },
      });
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription$) {
      this.deleteSubscription$.unsubscribe();
    }
  }
}
