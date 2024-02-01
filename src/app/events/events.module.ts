import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';
import { EventMarkerModalPageModule } from './event-detail/event-marker-modal/event-marker-modal.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EventsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    EventMarkerModalPageModule,
    SharedModule,
  ],
})
export class EventsPageModule {}
