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
  searchQuery: [] = [];
  categoryQuery: [] = [];
  locationQuery: [] = [];
  regions: any = Object.keys(BulgarianRegions).filter((value) =>
    isNaN(Number(value))
  );

  categories: any = Object.keys(Categories).filter((value) =>
  isNaN(Number(value))
  )
  constructor(private eventService: EventsService) {}

  searchEvents():void {
    let query = '';

    if(this.searchQuery.length > 0){
      query += `search=${this.searchQuery}&`;
    }

    if(this.categoryQuery.length > 0){
      
      if(this.categoryQuery.length > 1){
        this.categoryQuery.forEach((el: string) => {
          query += `category=${el}&`;
        });
      }else{
        query += `category=${this.categoryQuery}&`;
      }
    }

    if(this.locationQuery.length > 0){
      if(this.locationQuery.length > 1){
        this.locationQuery.forEach((el: string) => {
          query += `location=${el}&`;
        });
      }else{
        query += `region=${this.locationQuery}&`;
      }
    }

    query = query.slice(0, -1);
    if(this.searchQuery.length == 0 && this.categoryQuery.length == 0 && this.locationQuery.length == 0){
      query = '';
    }
    this.getEvents(query);
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
