import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FavouritesPageRoutingModule } from './favourites-routing.module';
import { FavouritesPage } from './favourites.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FavouritesPage],
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule,
    SharedModule,
  ],
})
export class FavouritesPageModule {}
