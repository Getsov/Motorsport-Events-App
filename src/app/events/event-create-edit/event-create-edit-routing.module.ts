import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCreateEditPage } from './event-create-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EventCreateEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventCreatePageRoutingModule {}
