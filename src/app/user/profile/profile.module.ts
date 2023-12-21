import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [ProfilePage],
    imports: [
        CommonModule,
        ExploreContainerComponentModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        SharedModule
    ]
})
export class ProfilePageModule {}
