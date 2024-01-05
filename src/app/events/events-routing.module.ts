import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RegularUserGuard } from 'src/shared/guards/regular-user.guard';
import { EventCreatorGuard } from 'src/shared/guards/event-creator.guard';

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
    canActivate: [AuthGuard, RegularUserGuard],
  },
  {
    path: ':eventId',
    loadChildren: () =>
      import('./event-detail/event-detail.module').then(
        (m) => m.EventDetailPageModule
      ),
  },
  {
    path: 'edit/:eventId',
    loadChildren: () =>
      import('./event-create/event-create.module').then(
        (m) => m.EventCreatePageModule
      ),
    canActivate: [AuthGuard, RegularUserGuard],
    // TODO: set guard to check if the user is the creator of the event
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
