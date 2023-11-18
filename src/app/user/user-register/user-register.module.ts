import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegisterPageRoutingModule } from './user-register-routing.module';
import { UserRegisterPage } from './user-register.page';
import { OrganizationRegisterPage } from '../organization-register/organization-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegisterPageRoutingModule,
  ],
  declarations: [UserRegisterPage, OrganizationRegisterPage],
  exports: [UserRegisterPage],
})
export class UserRegisterPageModule {}
