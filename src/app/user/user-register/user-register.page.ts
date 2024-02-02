import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/shared/services/auth.service';

import BulgarianRegions from 'src/shared/data/regions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit, OnDestroy {
  userRegisterSubscription$!: Subscription;
  userChecked: boolean = true;

  authResponseError: string = '';
  selectedRegion: string = '';

  toasterMessage: string = '';
  toasterType: string = '';

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onRegisterUserSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      // touch every input so the invalid become red
      this.selectedRegion = '';
      return Object.values(registerForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const { email, password, repassword, firstName, lastName } =
      registerForm.value;

    const region = this.selectedRegion;

    this.userRegisterSubscription$ = this.authService
      .registerUser(email, password, repassword, firstName, lastName, region)
      .subscribe({
        next: () => {
          this.authResponseError = '';

          this.toasterMessage = 'Успешно регистрирахте потребителски акаунт!';
          this.toasterType = 'success';

          setTimeout(() => {
            this.router.navigateByUrl('/');

            registerForm.reset();
          }, 1000);
        },
        error: (error) => {
          this.errorToaster(error.error.error);
          this.selectedRegion = '';
          registerForm.reset();
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
    if (this.userRegisterSubscription$) {
      this.userRegisterSubscription$.unsubscribe();
    }
  }
}
