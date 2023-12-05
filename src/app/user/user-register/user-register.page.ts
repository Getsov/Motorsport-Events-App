import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/shared/services/auth.service';

import BulgarianRegions from 'src/shared/data/regions';

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

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onRegisterUserSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { email, password, repass, firstName, lastName } = registerForm.value;

    const region = this.selectedRegion;

    this.userRegisterSubscription$ = this.authService
      .registerUser(email, password, repass, firstName, lastName, region)
      .subscribe({
        next: (authResponse) => {
          console.log(authResponse);
          // TODO: do something with the response
          // TODO: navigate to home
        },
        error: (error) => {
          this.authResponseError = error.error.error;
        },
      });
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
