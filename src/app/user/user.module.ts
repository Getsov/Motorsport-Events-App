import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginPageModule } from './login/login.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserRoutingModule, LoginPageModule],
})
export class UserModule {}
