import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/shared/interfaces/Event';
import { User } from 'src/shared/interfaces/User';
import { AuthService } from 'src/shared/services/auth.service';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
  private deleteSubscription: Subscription = new Subscription();
  private eventsSubscription: Subscription = new Subscription();
  @Input() event!: Event;
  @Output() filteredEvents = new EventEmitter<any>();
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

  constructor(private authService: AuthService, private eventService: EventsService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }



  deleteEvent(event: Event): void {
    const confirmation = confirm('Are you sure you want to delete this event?');
    
    if(confirmation){
      event.isDeleted = true;
    this.deleteSubscription = this.eventService.deleteEvent(event, event._id).subscribe({
      next: () => {
        this.getEvents();
      },
      error(err) {
        console.log(err);
      },
    })
    }
    
  }

  getEvents () {
    this.eventsSubscription = this.eventService.getEvents().subscribe({
      next: (events) =>{
        this.filteredEvents.emit(events);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
    if(this.eventsSubscription){
      this.eventsSubscription.unsubscribe();
    }
  }
}
