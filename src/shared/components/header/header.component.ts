import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription$ = this.authService.userData$.subscribe({
      next: (authData) => (this.isLogged = !!authData),
    });
  }

  onLogout(): void {
    this.authService.logout();

    this.toasterType = 'success';
    this.toasterMessage = 'Успешно излизане от профила';

    setTimeout(() => {
      this.router.navigateByUrl('/');
      this.toasterMessage = '';
      this.toasterType = '';
    }, 1000);
  }
}
