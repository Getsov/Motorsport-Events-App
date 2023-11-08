import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LikeIconComponent } from './like-icon/like-icon.component';
import { TitleFadesComponent } from './title-fades/title-fades.component';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LikeIconComponent, TitleFadesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LikeIconComponent, TitleFadesComponent],
})
export class SharedModule {}
