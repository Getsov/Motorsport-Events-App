import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventsTypeListComponent } from './events-type-list/events-type-list.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    EventsTypeListComponent,
    FooterComponent,
    UpcomingEventsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
