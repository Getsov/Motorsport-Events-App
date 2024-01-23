import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss'],
})
export class EditPasswordModalComponent implements OnInit {
  editPassword$?: Subscription;
  errorMessage: string = '';

  @Input() userId: string = '';

  toasterMessage: string = '';
  toasterType: string = '';

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {}

  async onConfirmNewPassword(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const newPasswords = formData.value;

    this.editPassword$ = this.authService
      .editUserPassword(newPasswords, this.userId)
      .subscribe({
        next: async () => {
          this.authService.logout();

          this.toasterMessage =
            'Успешно редактирана парола! Моля влезте отново с профила си с новите данни.';
          this.toasterType = 'success';

          setTimeout(() => this.router.navigateByUrl('/'), 1000);

          await this.modalController.dismiss();
        },
        error: (error) => {
          this.errorMessage = error.error.error;
        },
      });
  }

  async closeModal(e: Event) {
    e.preventDefault();

    await this.modalController.dismiss();
  }
}
