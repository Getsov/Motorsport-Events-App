import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/shared/shared.module';
import { LoginPage } from '../login/login.page';
import { UserRegisterPageModule } from '../user-register/user-register.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
    UserRegisterPageModule,
  ],
  declarations: [AuthPage, LoginPage],
})
export class AuthPageModule {}
