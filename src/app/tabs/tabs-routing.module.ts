import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then(
            (m) => m.CalendarPageModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user-routing.module').then(
            (m) => m.UserRoutingModule
          ),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('../favourites/favourites.module').then(
            (m) => m.FavouritesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
