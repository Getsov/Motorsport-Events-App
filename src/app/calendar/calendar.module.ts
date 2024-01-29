import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { SharedModule } from 'src/shared/shared.module';
import { DatesComponent } from './dates/dates.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    SharedModule,
  ],
  declarations: [CalendarPage, DatesComponent, CalendarListComponent],
})
export class CalendarPageModule {}
