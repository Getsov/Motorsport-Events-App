import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import BulgarianRegions from 'src/shared/data/regions';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {email: '', firstName: '', lastName: '', region: ''};
  bulgarianRegions: string[] = Object.keys(BulgarianRegions).filter((v) =>
    isNaN(Number(v))
  );
  editResponseError!: string;
  region!: string;
  password: string = '***********';

  onRegionChange(region: string) {
    this.region = region;
  }

  onUserEdit(userEditForm: NgForm) {
    if(userEditForm.invalid){
      return;
    }

    const { email, password, firstName, lastName } = userEditForm.value;

    const region = this.region;
  }
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if(this.authService.getUser()){
      this.user = this.authService.getUser();
      /* this.selectedRegion = this.user.region;
      this.email = this.user["email"];
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName; */
    }
    
    console.log(this.user);
    
  }
}
