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
  participantPrices = [{ price: '', description: '' }];

  // get date values
  @ViewChild(SelectDatesComponent) selectDatesComponent!: SelectDatesComponent;
  dates = [{ date: '', startTime: '00:00', endTime: '00:00' }];

  // regions select
  selectedRegion: string = '';

  // selected address value
  selectedAddress: any;

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
  selectedEventTypeErrorMessage = '';

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

  constructor(
    private authService: AuthService,
    private eventService: EventsService,
    private router: Router
  ) {}

  ngOnInit() {}

  onCreateEventSubmit(eventForm: NgForm) {
    if (!this.imageUrl) {
      this.imageErrorMessage = 'Снимката е задължителна';
      return;
    }

    if (!this.selectedEventType) {
      this.selectedEventTypeErrorMessage = 'Полето е задължително';
      return;
    }

    if (eventForm.invalid) {
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
        }, // hard coded coordinates
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
}
