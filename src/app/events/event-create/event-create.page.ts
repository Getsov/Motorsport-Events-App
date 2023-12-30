import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectPriceComponent } from './select-price/select-price.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import BulgarianRegions from 'src/shared/data/regions';
import Categories from 'src/shared/data/categories';
import { AuthService } from 'src/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/shared/services/events.service';
import { transformDates } from 'src/shared/utils/date-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  eventSubscription$!: Subscription;
  errorMessage: string = '';

  // get price values
  @ViewChild(SelectPriceComponent) selectPricesComponent!: SelectPriceComponent;
  visitorPrices = [{ price: '', description: '' }];
  visitorError: any = false;
  participantPrices = [{ price: '', description: '' }];
  participantError: any = false;

  // get date values
  @ViewChild(SelectDatesComponent) selectDatesComponent!: SelectDatesComponent;
  dates = [{ date: '', startTime: '00:00', endTime: '00:00' }];
  datesError: any = false;

  // regions select
  selectedRegion: string = '';
  regionErrorMessage = '';

  // selected address value
  selectedAddress: any;
  addressErrorMessage = '';

  // image Url from imagePicker
  imageUrl: string = '';
  imageErrorMessage = '';

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  // event type select
  selectedEventType: string = '';
  eventCategories: string[] = Object.keys(Categories).filter((v) =>
    isNaN(Number(v))
  );
  typeErrorMessage = '';

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

  // Index signature so we can access dynamically variables for the error messages
  [key: string]: any;

  constructor(
    private authService: AuthService,
    private eventService: EventsService,
    private router: Router
  ) {}

  ngOnInit() {}

  onCreateEventSubmit(eventForm: NgForm) {
    if (
      !this.validateRequiredField(this.imageUrl, 'imageErrorMessage') ||
      !this.validateRequiredField(this.selectedEventType, 'typeErrorMessage') ||
      !this.validateRequiredField(this.selectedRegion, 'regionErrorMessage') ||
      !this.validateRequiredField(
        this.selectedAddress,
        'addressErrorMessage'
      ) ||
      !this.validateDatesField(this.dates, 'datesError') ||
      !this.validatePriceField(this.visitorPrices, 'visitorError') ||
      !this.validatePriceField(this.participantPrices, 'participantError') ||
      eventForm.invalid
    ) {
      return;
    }

    const user = this.authService.getUser();

    if (!user) {
      this.errorMessage = 'User not authenticated';
      return;
    }

    const formattedDates = transformDates(this.dates);

    const formValue = {
      shortTitle: eventForm.value.shortTitle,
      longTitle: eventForm.value.longTitle ? eventForm.value.longTitle : '',
      shortDescription: eventForm.value.shortDescription,
      longDescription: eventForm.value.longDescription
        ? eventForm.value.longDescription
        : '',
      imageUrl: this.imageUrl,
      category: this.selectedEventType,
      contacts: {
        coordinates: {
          lat: this.selectedAddress.lat,
          lng: this.selectedAddress.lng,
        },
        region: this.selectedRegion,
        address: this.selectedAddress.address,
        email: eventForm.value.email,
        phone: eventForm.value.phone,
      },
      visitorPrices: this.visitorPrices,
      participantPrices: this.participantPrices,
      dates: formattedDates,
      creator: user._id,
      isDeleted: false,
      isApproved: false,
    };

    this.eventSubscription$ = this.eventService
      .createEvent(formValue)
      .subscribe({
        next: (createdEvent) => {
          // TODO: Toaster message
          console.log(createdEvent);
          // redirect to all events X-seconds after success toaster appears
        },
        error: (err) => {
          // TODO: display error message in toaster
          this.errorMessage = err.message;
          console.log(err);
        },
      });
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

  onConfirmedAddress(confirmedAddress: any) {
    this.selectedAddress = confirmedAddress;
  }

  // function to validate inputs which can not be validated from the template
  validateRequiredField(value: any, errorMessageVariable: string): boolean {
    if (!value) {
      this[errorMessageVariable] = 'Полето е задължително';
      return false;
    }
    this[errorMessageVariable] = '';

    return true;
  }

  validatePriceField(
    priceArr: { price: string; description: string }[],
    errorMessageVariable: string
  ): boolean {
    for (let i = 0; i < priceArr.length; i++) {
      if (!priceArr[i].price || !priceArr[i].description) {
        this[errorMessageVariable] = ['Некоректно попълнени полета', i];
        return false;
      }
    }
    this[errorMessageVariable] = false;
    return true;
  }

  validateDatesField(
    datesArr: { date: string; startTime: string; endTime: string }[],
    errorMessageVariable: string
  ): boolean {
    for (let i = 0; i < datesArr.length; i++) {
      if (
        !datesArr[i].date ||
        datesArr[i].startTime === '00:00' ||
        datesArr[i].endTime === '00:00' ||
        datesArr[i].startTime >= datesArr[i].endTime
      ) {
        this[errorMessageVariable] = ['Некоректно попълнени полета', i];
        return false;
      }
    }
    this[errorMessageVariable] = false;
    return true;
  }
}
