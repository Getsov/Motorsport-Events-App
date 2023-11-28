import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import BulgarianRegions from 'src/shared/data/regions';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  userChecked: boolean = true;

  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );
  constructor() {}

  ngOnInit() {}

  onRegister(registerForm: NgForm) {}
}
