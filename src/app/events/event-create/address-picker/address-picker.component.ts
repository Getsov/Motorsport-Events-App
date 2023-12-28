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

  suggestions: any[] = [];

  initialCoordinates = { lat: 42.698334, long: 23.319941 }; // sofia coordinates for initial map marker

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onOpenModal() {
    setTimeout(() => {
      // initialize google maps moment after modal is opened. Otherwise throws error "gmap is undefined"
      this.createMap(this.initialCoordinates.lat, this.initialCoordinates.long);
    }, 1);
  }

  async onAddressSelect(address: any) {
    this.suggestions = [];

    let coordinates: any = await this.geoCode(address.description);

    const selectedAddress = {
      title: address.structured_formatting.main_text,
      address: address.structured_formatting.secondary_text,
      lat: coordinates.lat,
      lng: coordinates.lng,
    };

    this.createMap(
      selectedAddress.lat,
      selectedAddress.lng,
      selectedAddress.title,
      selectedAddress.address
    );
  }

  async onSearchChange(searchTerm: any) {
    const searchKeyword = searchTerm.value;

    // pass searchKeyword
    if (searchKeyword) await this.getPlaces(searchKeyword);
  }

  async getPlaces(searchTerm: string) {
    try {
      const autocomplete = new google.maps.places.AutocompleteService();
      autocomplete.getPlacePredictions(
        {
          input: searchTerm,
          componentRestrictions: {
            country: 'BG',
          },
        },
        (predictions) => {
          this.suggestions = [];
          predictions?.forEach((place) => this.suggestions.push(place));
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createMap(lat: number, lng: number, title?: string, address?: string) {
    this.map = await GoogleMap.create({
      id: this.initialCoordinates.lat.toString(),
      apiKey: environment.mapsKey,
      element: this.gmap.nativeElement,
      config: {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 13,
      },
    });
    if (title && address) {
      await this.addMarker(title, address, lat, lng);
    }
  }

  async addMarker(title: string, address: string, lat: number, lng: number) {
    const marker: Marker = {
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: title,
      snippet: address,
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
  // let coordinates: any = await this.geoCode(place.description);

  geoCode(address: string) {
    const latLng = { lat: 0, lng: 0 };

    return new Promise((res, rej) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (result) => {
        latLng.lat = result![0].geometry.location.lat();
        latLng.lng = result![0].geometry.location.lng();
        res(latLng);
      });
    });
  }
}
