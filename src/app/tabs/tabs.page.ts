import { Component } from '@angular/core';

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
  constructor() {}
}
