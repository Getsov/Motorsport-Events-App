import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: ':eventId',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
