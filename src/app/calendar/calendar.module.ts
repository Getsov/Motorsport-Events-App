import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from 'src/shared/shared.module';
import { DatesComponent } from './dates/dates.component';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    SharedModule,
  ],
  declarations: [CalendarPage, DatesComponent],
})
export class CalendarPageModule {}
