import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  home = 'assets/icon/tabBtn-icons/home-icon.svg';
  calendar = 'assets/icon/tabBtn-icons/calendar-icon.svg';
  events = 'assets/icon/tabBtn-icons/events-icon.svg';
  favorite = 'assets/icon/tabBtn-icons/favorite-icon.svg';
  profile = 'assets/icon/tabBtn-icons/profile-icon.svg';

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.selectedPath = event.url;
      });
  }

  navigateToEvents() {
    this.router.navigate(['/tabs/events'], { queryParams: {} });
  }
}
