import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { EventsPageModule } from './events/events.module';
import { EventsService } from '../shared/services/events.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TokenInterceptor } from 'src/shared/interceptos/tokenInterceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    EventsPageModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EventsService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
