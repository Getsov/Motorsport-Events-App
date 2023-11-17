import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  home = 'assets/icon/home-icon.svg';
  profile = 'assets/icon/profile-icon.svg';
  constructor() {}
}
