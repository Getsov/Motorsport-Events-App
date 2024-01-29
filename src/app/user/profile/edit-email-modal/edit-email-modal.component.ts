import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-edit-email-modal',
  templateUrl: './edit-email-modal.component.html',
  styleUrls: ['./edit-email-modal.component.scss'],
})
export class EditEmailModalComponent implements OnInit {
  editEmail$?: Subscription;

  @Input() userId: string = '';

  toasterMessage: string = '';
  toasterType: string = '';

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  async onConfirmNewEmail(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const newEmail = formData.value;

    this.editEmail$ = this.authService
      .editEmail(newEmail, this.userId)
      .subscribe({
        next: async (response) => {
          this.authService.logout();

          this.toasterMessage =
            'Успешно редактиран имейл! Моля влезте отново с профила си с новите данни.';
          this.toasterType = 'success';

          await this.modalController.dismiss();

          setTimeout(() => {
            this.router.navigateByUrl('/');

            this.resetToasters();
          }, 2000);
        },
        error: (error) => {
          this.toasterMessage = error.error.error;
          this.toasterType = 'error';

          setTimeout(() => {
            this.resetToasters();
          }, 5000);
        },
      });
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  async closeModal(e: Event) {
    e.preventDefault();

    await this.modalController.dismiss();
  }
}
