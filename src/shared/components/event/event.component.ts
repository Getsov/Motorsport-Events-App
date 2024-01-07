import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: any;
  @Input() eventId!: (event: {}) => void;

  location = 'assets/icon/mdi_location.svg';
  date = 'assets/icon/date-icon.svg';

  user: User | null = {
    email: '',
    firstName: '',
    lastName: '',
    region: '',
    role: '',
    organizatorName: '',
    phone: '',
    isDeleted: false,
  };

  constructor(private authService: AuthService) {}
  deleteEvent(event: {}): void {
    this.eventId(event);
  }
  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
