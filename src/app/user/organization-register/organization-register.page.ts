import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

import BulgarianRegions from 'src/shared/data/regions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.page.html',
  styleUrls: ['./organization-register.page.scss'],
})
export class OrganizationRegisterPage implements OnInit, OnDestroy {
  organizationSubscription$!: Subscription;

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  authResponseError: string = '';
  selectedRegion: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onOrganizatorRegisterSubmit(organizatorRegisterForm: NgForm) {
    if (organizatorRegisterForm.invalid) {
      return;
    }

    const { email, password, repass, organizatorName, phone } =
      organizatorRegisterForm.value;

    const role = 'organizer';
    const region = this.selectedRegion;

    this.organizationSubscription$ = this.authService
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
        next: () => {
          this.authResponseError = '';
          this.router.navigateByUrl('/');
          organizatorRegisterForm.reset();
        },
        error: (error) => {
          this.authResponseError = error.error.error;
          organizatorRegisterForm.reset();
        },
      });
  }

  onRegionChange(region: string) {
    this.selectedRegion = region;
  }

  ngOnDestroy(): void {
    if (this.organizationSubscription$) {
      this.organizationSubscription$.unsubscribe();
    }
  }
}
