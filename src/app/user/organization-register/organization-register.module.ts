import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationRegisterPageRoutingModule } from './organization-register-routing.module';

import { OrganizationRegisterPage } from './organization-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationRegisterPageRoutingModule,
  ],
  declarations: [OrganizationRegisterPage],
})
export class OrganizationRegisterPageModule {}
