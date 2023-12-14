import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { AuthGuard } from 'src/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./event-create/event-create.module').then(
        (m) => m.EventCreatePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: ':eventId',
    loadChildren: () =>
      import('./event-detail/event-detail.module').then(
        (m) => m.EventDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
