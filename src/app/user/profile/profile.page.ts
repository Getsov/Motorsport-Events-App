import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import BulgarianRegions from 'src/shared/data/regions';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User | null = {
    email: '', firstName: '', lastName: '', region: '',
    role: '',
    organizatorName: '',
    phone: '',
    isDeleted: false
  };
  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );
  editResponseError: string  = '';
  region: string = '';
  password: string = '***********';

  onRegionChange(region: string) {
    this.region = region;
  }

  onUserEdit(userEditForm: NgForm) {
    if(userEditForm.invalid){
      return;
    }

    const { email, password, firstName, lastName, organizatorName, phone} = userEditForm.value;

    const region = this.region;
  }
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if(!this.user){
      this.router.navigate(['/tabs/auth']);
    }
  }
}
