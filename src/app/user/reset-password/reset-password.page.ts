import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPassword$?: Subscription;

  // header stylization
  backButton = true;
  headerTitle = 'Забравена парола';

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  errorMessage: string = '';

  constructor(private eventService: EventsService, private router: Router) {}

  ngOnInit() {}

  onResetSubmit(resetForm: NgForm) {
    if (resetForm.invalid) {
      this.errorMessage = 'Моля въведете валиден имейл!';
      return;
    }

    const email = resetForm.value.email;

    this.resetPassword$ = this.eventService.resetPassword(email).subscribe({
      next: (response) => {
        if (response === 'Email sent successfully') {
          this.toasterType = 'success';
          this.toasterMessage =
            'Успешно изпратена нова парола. Моля проверете имейла си.';

          setTimeout(() => {
            this.router.navigateByUrl('/');

            this.resetToasters();
          }, 1000);
        }
      },
      error: (error) => {
        this.toasterMessage = error.error.error;
        this.toasterType = 'error';

        setTimeout(() => {
          this.resetToasters();
        }, 5000);
      },
    });
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }
}
