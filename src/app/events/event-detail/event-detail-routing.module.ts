import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventDetailPage } from './event-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailPage
  },
  {
    path: 'event-marker-modal',
    loadChildren: () => import('./event-marker-modal/event-marker-modal.module').then( m => m.EventMarkerModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailPageRoutingModule {}
