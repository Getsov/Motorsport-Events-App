import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Categories from 'src/shared/data/categories';
import BulgarianRegions from 'src/shared/data/regions';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() titleColor: string = 'orange';
  @Input() titleText: string = 'Филтриране на събития';
  @Output() filteredEvents = new EventEmitter<any>();

  category: string = 'Категория';
  location: string = 'Регион';

  regions: {} = Object.values(BulgarianRegions).filter((key) =>
    isNaN(Number(key))
  );

  categories: {} = Object.values(Categories).filter((value) =>
    isNaN(Number(value))
  );

  constructor(private eventService: EventsService) {}

  locationChangeHandler(event: any): void {
    this.getEvents(event.detail.value);
  }

  categoryChangeHandler(event: any): void {
    this.getEvents(event.detail.value);
  }

  getEvents (query: string = "") {
    this.eventService.getEvents(query).subscribe({
      next: (events) =>{
        this.filteredEvents.emit(events);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit() {}
}
