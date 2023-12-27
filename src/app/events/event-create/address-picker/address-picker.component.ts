import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';

import { EventMarkerModalPage } from '../../event-detail/event-marker-modal/event-marker-modal.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
})
export class AddressPickerComponent implements OnInit {
  @ViewChild('map') gmap!: ElementRef;
  map!: GoogleMap;
  initialCoordinates = { lat: 42.698334, long: 23.319941 }; // sofia coordinates for initial map marker

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onOpenModal() {
    setTimeout(() => {
      // initialize google maps moment after modal is opened. Otherwise throws error "gmap is undefined"
      this.createMap();
    }, 1);
  }

  onSearchChange(searchTerm: any) {
    console.log(searchTerm);
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: this.initialCoordinates.lat.toString(),
      apiKey: environment.mapsKey,
      element: this.gmap.nativeElement,
      config: {
        center: {
          lat: Number(this.initialCoordinates.lat),
          lng: Number(this.initialCoordinates.long),
        },
        zoom: 13,
      },
    });

    await this.addMarker();
  }

  async addMarker() {
    const marker: Marker = {
      coordinate: {
        lat: Number(this.initialCoordinates.lat),
        lng: Number(this.initialCoordinates.long),
      },
      title: 'test title',
      snippet: `test address`,
    };

    await this.map.addMarker(marker);

    await this.map.setOnMarkerClickListener(async () => {
      const modal = await this.modalController.create({
        component: EventMarkerModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.12],
        initialBreakpoint: 0.12,
        showBackdrop: false,
      });

      modal.present();
    });
  }
}
