import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCreatePageRoutingModule } from './event-create-edit-routing.module';

import { EventCreateEditPage } from './event-create-edit.page';
import { SharedModule } from 'src/shared/shared.module';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import { SelectPriceComponent } from './select-price/select-price.component';
import { CalendarDatePickerComponent } from './calendar-picker/calendar-picker.component';
import { AddressPickerComponent } from './address-picker/address-picker.component';
import { EventMarkerModalPageModule } from '../event-detail/event-marker-modal/event-marker-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCreatePageRoutingModule,
    SharedModule,
    EventMarkerModalPageModule,
  ],
  declarations: [
    EventCreateEditPage,
    ImagePickerComponent,
    SelectDatesComponent,
    SelectPriceComponent,
    CalendarDatePickerComponent,
    AddressPickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventCreateEditPageModule {}
