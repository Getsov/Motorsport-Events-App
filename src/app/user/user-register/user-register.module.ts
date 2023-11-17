import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegisterPageRoutingModule } from './user-register-routing.module';

import { UserRegisterPage } from './user-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegisterPageRoutingModule,
  ],
  declarations: [],
})
export class UserRegisterPageModule {}
