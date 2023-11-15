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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
