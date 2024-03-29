import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { SharedModule } from '../../../shared/shared.module';
import { EditPasswordModalComponent } from './edit-password-modal/edit-password-modal.component';
import { EditEmailModalComponent } from './edit-email-modal/edit-email-modal.component';

@NgModule({
  declarations: [
    ProfilePage,
    EditPasswordModalComponent,
    EditEmailModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
  ],
})
export class ProfilePageModule {}
