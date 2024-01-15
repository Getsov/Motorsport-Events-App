import { Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private eventsSubscription: Subscription = new Subscription();

  category: string = 'Категория';
  location: string = 'Регион';
  searchQuery: [] = [];
  locationQuery: [] = [];
  selectedCategory: number[] = [];
  sortBy: string = '';

  regions: any = Object.keys(BulgarianRegions).filter((value) =>
  isNaN(Number(value))
  );
  
  categories: any = Object.keys(Categories).filter((value) =>
  isNaN(Number(value))

  )
  constructor(private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.router.events.subscribe((event) => {
        if(event instanceof NavigationEnd) {
          const currentQuery = this.activatedRoute.snapshot.queryParams['sortBy'];
          if(this.sortBy != currentQuery){
            this.sortBy = currentQuery;
            if(this.sortBy){
              this.selectedCategory = this.sortBy.split(',').map(Number);
              this.searchEvents();
            }
          }
        }
      });
    }
  
  ngOnInit() {}
  
  searchEvents():void {
    let query = '';
    
    if(this.searchQuery.length > 0){
      query += `search=${this.searchQuery}&`;
    }

    if(this.selectedCategory.length > 0){
      
      if(this.selectedCategory.length > 1){
        this.selectedCategory.forEach((el) => {
          query += `category=${el}&`;
        });
      }else{
        query += `category=${this.selectedCategory}&`;
      }
    }else{
      query = '';
      this.clearUrlQuery();
    }

    if(this.locationQuery.length > 0){
      if(this.locationQuery.length > 1){
        this.locationQuery.forEach((el: string) => {
          query += `region=${el}&`;
        });
      }else{
        query += `region=${this.locationQuery}&`;
      }
    }

    query = query.slice(0, -1);

    if(this.searchQuery.length == 0 && this.selectedCategory.length == 0 && this.locationQuery.length == 0){
      query = '';
      this.clearUrlQuery();
    }
    this.getEvents(query);
  }

  getEvents (query: string = "") {
    this.eventsSubscription = this.eventService.getEvents(query).subscribe({
      next: (events) =>{
        this.filteredEvents.emit(events);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearUrlQuery():void{
    this.router.navigate(['.'],{
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true
    });
  }

  ionViewDidLeave(): void {
    if(this.eventsSubscription){
      this.eventsSubscription.unsubscribe();
    }
  }
}
