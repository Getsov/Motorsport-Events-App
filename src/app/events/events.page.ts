import { Component, InjectionToken, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { DatePipeConfig } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  //TODO: CHANGE TYPE OF EVENTS!!!
  eventsData: any = [];
  DATE_PIPE_DEFAULT_OPTIONS: InjectionToken<DatePipeConfig> | undefined;
  
  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';
  
  location = 'assets/icon/icon-location.svg';

  headerTitle: string = 'Събития';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;

  constructor(private router: Router, private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) =>{
        this.eventsData = events;
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  eventRedirect(id: string): void {
    this.router.navigate(['/tabs/events/' + id]);
  }
}
