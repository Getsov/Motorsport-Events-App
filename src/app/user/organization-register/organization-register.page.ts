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

  toasterMessage: string = '';
  toasterType: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onOrganizatorRegisterSubmit(organizatorRegisterForm: NgForm) {
    if (organizatorRegisterForm.invalid) {
      // touch every input so the invalid become red
      return Object.values(organizatorRegisterForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    }

    const { email, password, repassword, organizatorName, phone } =
      organizatorRegisterForm.value;

    const role = 'organizer';
    const region = this.selectedRegion;

    this.organizationSubscription$ = this.authService
      .registerOrganizator(
        email,
        password,
        repassword,
        organizatorName,
        phone,
        region,
        role
      )
      .subscribe({
        next: () => {
          this.authResponseError = '';

          this.toasterMessage =
            'Успешно подадохте заявка за регистрация на организаторски акаунт! Очаквайте да получите потвърждение на имейла си.';
          this.toasterType = 'success';

          setTimeout(() => {
            this.router.navigateByUrl('/');

            this.resetToasters();
            organizatorRegisterForm.reset();
          }, 1000);
        },
        error: (error) => {
          this.errorToaster(error.error.error);

          organizatorRegisterForm.reset();
        },
      });
  }

  // present error toaster
  errorToaster(errorMessage: string) {
    this.toasterMessage = errorMessage;
    this.toasterType = 'error';

    setTimeout(() => {
      this.resetToasters();
    }, 5000);
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
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
