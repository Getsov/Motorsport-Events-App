import { LikeIconComponent } from './components/like-icon/like-icon.component';
import { TitleFadesComponent } from './components/title-fades/title-fades.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  imports: [
    CommonModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  declarations: [
    LikeIconComponent,
    TitleFadesComponent,
    HeaderComponent,
    EventComponent,
    ToasterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    LikeIconComponent,
    TitleFadesComponent,
    HeaderComponent,
    EventComponent,
    ToasterComponent,
  ],
})
export class SharedModule {}
