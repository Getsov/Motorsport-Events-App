import { Component, OnInit } from '@angular/core';
import BulgarianRegions from 'src/shared/data/regions';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.page.html',
  styleUrls: ['./organization-register.page.scss'],
})
export class OrganizationRegisterPage implements OnInit {
  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );

  constructor() {}

  ngOnInit() {}
}