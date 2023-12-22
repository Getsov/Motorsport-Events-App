import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getHourFromWheelPicker } from 'src/shared/utils/date-utils';

@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss'],
})
export class SelectDatesComponent implements OnInit {
  @Input() dates!: { date: string; startTime: string; endTime: string }[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  addDate() {
    this.dates.push({ date: '', startTime: '00:00', endTime: '00:00' });
  }

  removeDate(index: number) {
    if (this.dates.length > 1) {
      this.dates.splice(index, 1);
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  onDoneClick(i: number, hourType: string, value: any) {
    if (hourType === 'startTime') {
      this.dates[i].startTime = getHourFromWheelPicker(value);
    } else {
      this.dates[i].endTime = getHourFromWheelPicker(value);
    }
    this.closeModal();
  }
}
