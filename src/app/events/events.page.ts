import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { Event } from 'src/shared/interfaces/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit{
  //TODO: CHANGE TYPE OF EVENTS!!!
  eventsData:any = [];
  query:any = [];

  @Input() titleColor: string = 'yellow';
  @Input() titleText: string = 'Списък със събития';
  
  location = 'assets/icon/icon-location.svg';

  headerTitle: string = 'Събития';
  defaultHref: string = '/tabs/home';
  backButton: boolean = true;

  constructor(private router: Router, private eventService: EventsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getData(event:any): any {
    this.eventsData = event;
  }

  getEvents (query: string = "") {
    this.eventService.getEvents(query).subscribe({
      next: (events) =>{
        this.eventsData = events;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
