import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventsTypeListComponent } from './events-type-list/events-type-list.component';
import { SharedModule } from 'src/shared/shared.module';
import { SlideCardComponent } from './slide-card/slide-card.component';
import { GeneralTermsComponent } from './general-terms/general-terms.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    EventsTypeListComponent,
    UpcomingEventsComponent,
    SlideCardComponent,
    GeneralTermsComponent,
    AboutUsComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
