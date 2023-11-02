import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';

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
export class EventsPageModule { }
