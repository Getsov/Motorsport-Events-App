import { LikeIconComponent } from './components/like-icon/like-icon.component';
import { TitleFadesComponent } from './components/title-fades/title-fades.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { EventLineComponent } from './components/event-line/event-line.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [
    LikeIconComponent,
    TitleFadesComponent,
    HeaderComponent,
    EventComponent,
    ToasterComponent,
    EventLineComponent,
    ConfirmModalComponent,
    SearchComponent,
    LoadingSpinnerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    LikeIconComponent,
    TitleFadesComponent,
    HeaderComponent,
    EventComponent,
    ToasterComponent,
    EventLineComponent,
    SearchComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
