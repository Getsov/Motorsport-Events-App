import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import BulgarianRegions from 'src/shared/data/regions';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { EditPasswordModalComponent } from './edit-password-modal/edit-password-modal.component';
import { ConfirmModalComponent } from 'src/shared/components/confirm-modal/confirm-modal.component';
import { EditEmailModalComponent } from './edit-email-modal/edit-email-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editForm$?: Subscription;

  errorMessage: string = '';

  user: User | null = {
    email: '',
    firstName: '',
    lastName: '',
    region: '',
    role: '',
    organizatorName: '',
    phone: '',
    isDeleted: false,
    isApproved: false,
  };

  toasterMessage: string = '';
  toasterType: string = '';

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  editResponseError: string = '';
  userPassword: string = '***********';

  hasConfirmedEdit: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserFromLocalStorage();
    if (!this.user) {
      this.router.navigate(['/tabs/auth']);
    }
  }

  onUserEdit(userEditForm: NgForm) {
    if (userEditForm.invalid || !this.hasConfirmedEdit) {
      return;
    }

    const editFormValue = userEditForm.value;

    this.editForm$ = this.authService
      .editUserInfo(editFormValue, this.user?._id!)
      .subscribe({
        next: () => {
          this.authService.logout();

          this.toasterMessage =
            'Успешно редактиран профил! Моля влезте отново в профила си';
          this.toasterType = 'success';

          setTimeout(() => this.router.navigateByUrl('/'), 2000);
        },
        error: (error) => (this.errorMessage = error.error.error),
      });
  }

  // present password edit modal
  async presentPasswordModal() {
    const modal = await this.modalController.create({
      component: EditPasswordModalComponent,
      cssClass: 'edit-password-modal',
      componentProps: { userId: this.user?._id },
    });

    await modal.present();
  }

  // present email edit modal
  async presentEmailModal() {
    const modal = await this.modalController.create({
      component: EditEmailModalComponent,
      cssClass: 'edit-email-modal',
      componentProps: { userId: this.user?._id },
    });

    await modal.present();
  }

  // confirm edit info modal
  async presentConfirmModal(userEditForm: NgForm) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { modalType: 'editProfile' },
      cssClass: 'confirm-modal',
    });

    modal
      .onDidDismiss()
      .then((hasConfirmed) => {
        if (hasConfirmed.data) {
          this.hasConfirmedEdit = hasConfirmed.data;
          this.onUserEdit(userEditForm);
        }
      })
      .catch(console.log);

    await modal.present();
  }
}
