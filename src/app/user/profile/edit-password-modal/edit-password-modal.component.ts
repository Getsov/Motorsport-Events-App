import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss'],
})
export class EditPasswordModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}
  ngOnInit() {}

  async onConfirmNewPassword(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const newPassword = formData.value.password;
    await this.modalController.dismiss(newPassword);
  }

  async closeModal(e: Event) {
    e.preventDefault();

    await this.modalController.dismiss();
  }
}
