import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { GuestGuard } from 'src/shared/guards/guest.guard';

const routes: Routes = [
  // TODO: Auth guard to check if user is logged in
  // If yes - redirect to Profile page. If no - redirect to Login page.
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
    canLoad: [GuestGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
