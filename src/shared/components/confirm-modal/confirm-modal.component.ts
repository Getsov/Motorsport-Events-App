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

  showToaster: boolean = false;
  toasterMessage: string = '';
  toasterType: string = '';

  constructor(
    private modalController: ModalController,
    private eventService: EventsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.showToaster = false;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  onDoneClick() {
    this.deleteSubscription$ = this.eventService
      .deleteEvent({ isDeleted: true }, this.eventId)
      .subscribe({
        next: () => {
          this.toasterMessage = 'Успешно изтрито събитие';
          this.toasterType = 'success';
          this.showToaster = true;

          this.router.navigateByUrl('/tabs/events');
          this.modalController.dismiss();
        },
        error: (err) => {
          this.toasterType = 'error';
          this.toasterMessage = err.error.error;
          this.showToaster = true;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription$) {
      this.deleteSubscription$.unsubscribe();
    }
  }
}
