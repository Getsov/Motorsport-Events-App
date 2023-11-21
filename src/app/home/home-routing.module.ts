import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GeneralTermsComponent } from './general-terms/general-terms.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'general-terms',
    component: GeneralTermsComponent,
  },
  {
    path: 'privacy-policy',
    component: GeneralTermsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
