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
import { SharedModule } from 'src/shared/shared.module';
import { SlideCardComponent } from './slide-card/slide-card.component';
import { GeneralTermsComponent } from './general-terms/general-terms.component';

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
    SlideCardComponent,
    GeneralTermsComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
