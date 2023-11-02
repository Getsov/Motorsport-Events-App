import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
