import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

import BulgarianRegions from 'src/shared/data/regions';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.page.html',
  styleUrls: ['./organization-register.page.scss'],
})
export class OrganizationRegisterPage implements OnInit {
  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  authResponseError: string = '';
  selectedRegion: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onOrganizatorRegisterSubmit(organizatorRegisterForm: NgForm) {
    if (organizatorRegisterForm.invalid) {
      return;
    }

    const { email, password, repass, organizatorName, phone } =
      organizatorRegisterForm.value;

    const role = 'organizer';
    const region = this.selectedRegion;

    this.authService
      .registerOrganizator(
        email,
        password,
        repass,
        organizatorName,
        phone,
        region,
        role
      )
      .subscribe({
        next: (authResponse) => {
          console.log(authResponse);
        },
        error: (error) => {
          this.authResponseError = error.error.error;
        },
      });
  }

  onRegionChange(region: string) {
    this.selectedRegion = region;
  }
}
