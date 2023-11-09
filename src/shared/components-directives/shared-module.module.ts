import { LikeIconComponent } from './like-icon/like-icon.component';
import { TitleFadesComponent } from './title-fades/title-fades.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LikeIconComponent, TitleFadesComponent, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LikeIconComponent, TitleFadesComponent, HeaderComponent],
})
export class SharedModule {}