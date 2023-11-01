import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { CategoryResultsComponent } from './category-results/category-results.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: ':eventType',
    component: CategoryResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
