import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SelectPriceComponent } from './select-price/select-price.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import { AuthService } from 'src/shared/services/auth.service';
import { EventsService } from 'src/shared/services/events.service';
import {
  transformDates,
  transformDateFromBackend,
} from 'src/shared/utils/date-utils';
import BulgarianRegions from 'src/shared/data/regions';
import Categories from 'src/shared/data/categories';
import { Event } from 'src/shared/interfaces/Event';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create-edit.page.html',
  styleUrls: ['./event-create-edit.page.scss'],
})
export class EventCreateEditPage implements OnInit, OnDestroy {
  eventSubscription$!: Subscription;
  getEventSubsription$!: Subscription;
  eventData!: Event;
  eventId: string | null = '';

  successToasterMessage: string = '';
  errorToasterMessage: string = '';

  // get price values
  @ViewChild(SelectPriceComponent) selectPricesComponent!: SelectPriceComponent;
  visitorPrices = [{ price: 0, description: '' }];
  visitorError: any = false;
  participantPrices = [{ price: 0, description: '' }];
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    // if it has an id means it is an edit page and then load the event data
    if (this.eventId) {
      this.getEventSubsription$ = this.eventService
        .getEvent(this.eventId)
        .subscribe({
          next: (eventResponse) => {
            this.eventData = eventResponse;
            this.populateEventDataInForm();
          },
          error: (err) => (this.errorToasterMessage = err.message),
        });
    }
  }

  populateEventDataInForm(): void {
    this.imageUrl = this.eventData.imageUrl;
    this.selectedEventType = this.eventData.category;
    this.selectedRegion = this.eventData.contacts.region;

    // split location to title and address
    const [title, address] = this.eventData.contacts.address.split(', ');
    this.selectedAddress = {
      title,
      address,
      lat: Number(this.eventData.contacts.coordinates.lat),
      lng: Number(this.eventData.contacts.coordinates.lng),
    };

    // transform date from backend
    this.dates = transformDateFromBackend(this.eventData.dates);
    if (this.eventData.visitorPrices) {
      this.visitorPrices = this.eventData.visitorPrices;
    }
    if (this.eventData.participantPrices) {
      this.participantPrices = this.eventData.participantPrices;
    }
  }

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
      this.errorToasterMessage = 'Неоторизиран потребител';
      return;
    }

    const formattedDates = transformDates(this.dates);

    const formValue: any = {
      shortTitle: eventForm.value.shortTitle,
      longTitle: eventForm.value.longTitle ? eventForm.value.longTitle : '',
      shortDescription: eventForm.value.shortDescription,
      longDescription: eventForm.value.longDescription
        ? eventForm.value.longDescription
        : '',
      imageUrl: this.imageUrl,
      category: eventForm.value.category,
      contacts: {
        coordinates: {
          lat: this.selectedAddress.lat,
          lng: this.selectedAddress.lng,
        },
        region: eventForm.value.region,
        address: `${this.selectedAddress.title}, ${this.selectedAddress.address}`,
        email: eventForm.value.email,
        phone: eventForm.value.phone,
      },
      visitorPrices: this.visitorPrices,
      participantPrices: this.participantPrices,
      dates: formattedDates,
    };

    if (this.eventId) {
      this.eventSubscription$ = this.eventService
        .editEvent(formValue, this.eventId)
        .subscribe({
          next: () => {
            this.successToasterMessage =
              'Успешно редактирано събитие! Събитието очаква одобрение от администратор.';
            setTimeout(
              () => this.router.navigateByUrl(`/tabs/events/${this.eventId}`),
              5000
            );
          },
          error: (err) => {
            this.errorToasterMessage = err.message;
          },
        });
    } else {
      formValue.creator = user._id;
      this.eventSubscription$ = this.eventService
        .createEvent(formValue)
        .subscribe({
          next: () => {
            this.successToasterMessage =
              'Успешно създадено събитие! Събитието очаква одобрение от администратор.';
            setTimeout(() => this.router.navigateByUrl('/tabs/events'), 5000);
          },
          error: (err) => {
            this.errorToasterMessage = err.message;
          },
        });
    }
  }

  onRegionChange(region: string): void {
    this.selectedRegion = region;
    this.regionErrorMessage = '';
  }

  onEventTypeChange(category: string): void {
    this.selectedEventType = category;
    this.typeErrorMessage = '';
  }

  onImageUpload(imageData: string) {
    this.imageUrl = imageData;
  }

  onConfirmedAddress(confirmedAddress: any) {
    this.selectedAddress = confirmedAddress;
    this.addressErrorMessage = '';
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
    priceArr: { price: string | number; description: string }[],
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

  ngOnDestroy(): void {
    if (this.eventSubscription$) this.eventSubscription$.unsubscribe();
    if (this.getEventSubsription$) this.getEventSubsription$.unsubscribe();
  }
}
