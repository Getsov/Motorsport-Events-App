import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCreatePageRoutingModule } from './event-create-routing.module';

import { EventCreatePage } from './event-create.page';
import { SharedModule } from 'src/shared/shared.module';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import { SelectPriceComponent } from './select-price/select-price.component';
import { CalendarDatePickerComponent } from './calendar-date-picker/calendar-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCreatePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    EventCreatePage,
    ImagePickerComponent,
    SelectDatesComponent,
    SelectPriceComponent,
    CalendarDatePickerComponent,
  ],
})
export class EventCreatePageModule {}
