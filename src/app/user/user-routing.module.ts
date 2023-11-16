import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // TODO: Auth guard to check if user is logged in
  // If yes - redirect to Profile page. If no - redirect to Login page.
  {
    path: 'auth',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('./register/register.module').then((m) => m.RegisterPageModule),
  // },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
