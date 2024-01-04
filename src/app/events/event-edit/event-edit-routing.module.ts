import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventEditPage } from './event-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EventEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventEditPageRoutingModule {}
