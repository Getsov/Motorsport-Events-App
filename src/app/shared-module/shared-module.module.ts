import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LikeIconComponent } from './like-icon/like-icon.component';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LikeIconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LikeIconComponent],
})
export class SharedModule {}
