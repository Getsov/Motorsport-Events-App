import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from "../../shared/shared.module";
import { EventsPageModule } from '../events/events.module';

@NgModule({
    declarations: [NotificationsPage],
    imports: [
        CommonModule,
        ExploreContainerComponentModule,
        FormsModule,
        IonicModule,
        NotificationsPageRoutingModule,
        SharedModule,
        EventsPageModule
    ]
})
export class NotificationsPageModule {}
