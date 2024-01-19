import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Event } from 'src/shared/interfaces/Event';
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
  discardMessage: string =
    'Сигурни ли сте, че искате да откажете направените промени?';

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
      // TODO: handle create/edit case
      case 'dismiss':
        this.router.navigateByUrl('/tabs/events');
        await this.modalController.dismiss();
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

          this.router.navigateByUrl('/tabs/events');
          this.modalController.dismiss();
        },
        error: (err) => {
          this.toasterType = 'error';
          this.toasterMessage = err.error.error;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription$) {
      this.deleteSubscription$.unsubscribe();
    }
  }
}