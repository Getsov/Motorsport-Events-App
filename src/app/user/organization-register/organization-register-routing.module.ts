import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationRegisterPage } from './organization-register.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRegisterPageRoutingModule {}
