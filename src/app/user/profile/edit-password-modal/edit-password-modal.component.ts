import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss'],
})
export class EditPasswordModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onDoneClick() {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
