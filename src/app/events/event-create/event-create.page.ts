import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectPriceComponent } from './select-price/select-price.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import BulgarianRegions from 'src/shared/data/regions';
import Categories from 'src/shared/data/categories';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  // get price values
  @ViewChild(SelectPriceComponent) selectPricesComponent!: SelectPriceComponent;
  visitorPrices = [{ price: '', description: '' }];
  participantPrices = [{ price: '', description: '' }];

  // get date values
  @ViewChild(SelectDatesComponent) selectDatesComponent!: SelectDatesComponent;
  dates = [{ date: '', startTime: '00:00', endTime: '00:00' }];

  // regions select
  selectedRegion: string = '';

  // image Url from imagePicker
  imageUrl: string = '';

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  // event type select
  selectedEventType: string = '';
  eventCategories: string[] = Object.keys(Categories).filter((v) =>
    isNaN(Number(v))
  );

  // header separator settings
  headerTitle: string = 'Създай събитие';
  defaultHref: string = '/tabs/events';
  backButton: boolean = true;

  // separator separator settings
  separatorPictureTitle: string = 'Снимка на събитието';
  titleSeparatorColor: string = 'orange';

  // description separator settings
  descriptionSeparatorColor: string = 'yellow';
  descriptionSeparatorTitle: string = 'Описание на събитието';

  // date separator settings
  dateSeparatorColor: string = 'orange';
  dateSeparatorTitle: string = 'Дата и час';

  // prices separator settings
  priceSeparatorColor: string = 'yellow';
  priceSeparatorTitle: string = 'Цени';

  constructor() {}

  ngOnInit() {}

  onCreateEventSubmit(eventForm: NgForm) {
    // TODO: validation

    const formValue = {
      ...eventForm.value,
      visitorPrices: this.visitorPrices,
      participantPrices: this.participantPrices,
      dates: this.dates,
      imageUrl: this.imageUrl,
    };
    console.log('form finished', formValue);
  }

  onRegionChange(region: string): void {
    this.selectedRegion = region;
  }

  onEventTypeChange(category: string): void {
    this.selectedEventType = category;
  }

  onImageUpload(imageData: string) {
    this.imageUrl = imageData;
  }
}
