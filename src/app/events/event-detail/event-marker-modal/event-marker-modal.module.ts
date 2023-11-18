import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventMarkerModalPageRoutingModule } from './event-marker-modal-routing.module';

import { EventMarkerModalPage } from './event-marker-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventMarkerModalPageRoutingModule,
  ],
  declarations: [EventMarkerModalPage],
})
export class EventMarkerModalPageModule {}
