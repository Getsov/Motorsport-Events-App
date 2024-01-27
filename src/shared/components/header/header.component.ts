import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authSubscription$?: Subscription;

  @Input() headerTitle: string = '';
  @Input() backButton: boolean = false;
  @Input() defaultHref: string = '';

  isLogged: boolean = false;

  toasterType: string = '';
  toasterMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.authSubscription$ = this.authService.userData$.subscribe({
      next: (authData) => (this.isLogged = !!authData),
      error: (err) => {
        this.toasterMessage = err.error.error;
        this.toasterType = 'error';

        setTimeout(() => {
          this.resetToasters();
        }, 5000);
      },
    });
  }

  // open logout confirm modal
  async presentLogoutModal(modalType: string) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: { modalType },
      cssClass: 'confirm-modal',
    });

    modal
      .onDidDismiss()
      .then((hasConfirmed: any) => {
        if (hasConfirmed.data) {
          this.onLogout();
        }
      })
      .catch(console.log);

    await modal.present();
  }

  onLogout(): void {
    this.authService.logout();

    this.toasterType = 'success';
    this.toasterMessage = 'Успешно излизане от профила';

    setTimeout(() => {
      this.router.navigateByUrl('/');
      this.resetToasters();
    }, 1000);
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }
}
