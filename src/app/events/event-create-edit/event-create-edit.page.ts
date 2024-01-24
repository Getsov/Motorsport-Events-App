import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
import { IonContent, ModalController } from '@ionic/angular';
import { ConfirmModalComponent } from 'src/shared/components/confirm-modal/confirm-modal.component';
import { IonModal } from '@ionic/angular/common';

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

  toasterMessage: string = '';
  toasterType: string = '';

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

  @ViewChild(IonContent) content?: IonContent;

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
  selectedEventType: string[] = [];
  eventCategories: string[] = Object.keys(Categories).filter((v) =>
    isNaN(Number(v))
  );
  typeErrorMessage = '';

  // confirm modal
  modal: any;

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
    private route: ActivatedRoute,
    private modalController: ModalController,
    private renderer: Renderer2
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
          error: (err) => {
            this.toasterMessage = err.message;
            this.toasterType = 'error';
          },
        });
    }
  }

  populateEventDataInForm(): void {
    this.headerTitle = 'Редактирай събитие';
    this.imageUrl = this.eventData.imageUrl;
    this.selectedEventType = this.eventData.categories;
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

  async onCreateEventSubmit(eventForm: NgForm) {
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
      setTimeout(() => {
        this.scrollToErrorInput();
        this.toasterMessage = 'Моля, попълнете коректно всички полета!';
        this.toasterType = 'error';
      }, 100);

      return;
    }

    const user = this.authService.getUserFromLocalStorage();

    if (!user) {
      this.toasterMessage = 'Неоторизиран потребител';
      this.toasterType = 'error';
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
      categories: eventForm.value.category,
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

    // Confirm modal for event edit/create
    if (this.eventId) {
      await this.presentModal('edit');

      this.modal
        .onDidDismiss()
        .then((hasConfirmed: any) => {
          if (hasConfirmed.data && this.eventId) {
            this.eventSubscription$ = this.editEvent(formValue);
          }
        })
        .catch(console.log);
    } else {
      formValue.creator = user._id;

      await this.presentModal('create');

      this.modal
        .onDidDismiss()
        .then((hasConfirmed: any) => {
          if (hasConfirmed.data) {
            this.eventSubscription$ = this.createEvent(formValue);
          }
        })
        .catch(console.log);
    }
  }

  async presentModal(modalType: string) {
    this.modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { eventId: this.eventId, modalType },
      cssClass: 'confirm-modal',
    });

    await this.modal.present();
  }

  onRegionChange(region: string): void {
    this.selectedRegion = region;
    this.regionErrorMessage = '';
  }

  onEventTypeChange(category: string[]): void {
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

  // creat event handler
  createEvent(formValue: any) {
    return this.eventService.createEvent(formValue).subscribe({
      next: () => {
        // update user info in subject and localstorage. Previously newly created event was not added to createdEvents in FE.
        this.authService.updateUserAuthData(formValue.creator);

        this.toasterMessage =
          'Успешно създадено събитие! Събитието очаква одобрение от администратор.';
        this.toasterType = 'success';
        setTimeout(() => this.router.navigateByUrl('/tabs/events'), 2000);
      },
      error: (err) => {
        this.toasterMessage = err.message;
        this.toasterType = 'error';
      },
    });
  }

  // edit event handler
  editEvent(formValue: any) {
    return this.eventService.editEvent(formValue, this.eventId!).subscribe({
      next: () => {
        this.toasterMessage =
          'Успешно редактирано събитие! Събитието очаква одобрение от администратор.';
        this.toasterType = 'success';
        setTimeout(() => this.router.navigateByUrl(`/tabs/events`), 2000);
      },
      error: (err) => {
        this.toasterMessage = err.message;
        this.toasterType = 'error';
      },
    });
  }

  // find the first validation error message and scroll to it
  scrollToErrorInput(): void {
    const errorInputs = document.querySelectorAll('.validation-error-message');
    if (errorInputs.length > 0) {
      const firstErrorInput = errorInputs[0] as HTMLElement;
      const yOffset = -80;
      this.content?.scrollToPoint(0, firstErrorInput.offsetTop + yOffset, 500);
    }
  }

  ngOnDestroy(): void {
    if (this.eventSubscription$) this.eventSubscription$.unsubscribe();
    if (this.getEventSubsription$) this.getEventSubsription$.unsubscribe();
  }
}
