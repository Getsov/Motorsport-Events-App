import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRegisterPage } from './user-register.page';

const routes: Routes = [
  {
    path: '',
    component: UserRegisterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRegisterPageRoutingModule {}
