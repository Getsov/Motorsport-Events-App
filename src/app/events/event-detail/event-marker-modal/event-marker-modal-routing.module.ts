import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventMarkerModalPage } from './event-marker-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EventMarkerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventMarkerModalPageRoutingModule {}
