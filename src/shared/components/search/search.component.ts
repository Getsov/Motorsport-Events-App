import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Categories } from 'src/shared/data/categories';
import BulgarianRegions from 'src/shared/data/regions';
import { EventsService } from 'src/shared/services/events.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() parent: string = '';
  @Input() titleColor: string = 'orange';
  @Input() titleText: string = 'Филтриране на събития';
  @Input() externalSelectedCategory: number[] | undefined; // Input property to receive selected category from parent
  @Output() filteredEvents = new EventEmitter<any>();
  @Output() isLoadingEvents = new EventEmitter<boolean>();

  eventsSubscription!: Subscription;

  category: string = 'Категория';
  location: string = 'Регион';
  searchQuery: [] | string = '';
  locationQuery: [] = [];
  selectedCategory: number[] = [];
  sortBy: string = '';

  // toaster info
  toasterType: string = '';
  toasterMessage: string = '';

  regions: any = Object.keys(BulgarianRegions).filter((value) =>
    isNaN(Number(value))
  );

  categories: any = Object.keys(Categories).filter((value) =>
    isNaN(Number(value))
  );
  private destroy$ = new Subject<void>();
  constructor(
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  loadEventsBasedOnRoute(): void {
    const route = this.router.parseUrl(this.router.url);
    const queryParams = route.queryParamMap.keys;

    if (queryParams.includes('category')) {
      // If 'sortBy' query parameter is present, update selectedCategory.
      const categoryToSort = route.queryParamMap.get('category');
      this.selectedCategory = categoryToSort ? [Number(categoryToSort)] : [];
      // Call searchEvents to load events based on the selected category.
      this.searchEvents();
    } else if (
      Object.keys(queryParams).length === 0 ||
      route.queryParamMap.keys.length === 0
    ) {
      // If there are no query parameters, load all events and reset selectedCategory.

      this.selectedCategory = [];
      this.getEvents();
    } else {
      // For other query parameters, update the search criteria.
      this.updateSearchCriteriaFromQueryParams(queryParams);
      this.searchEvents();
    }
  }

  updateSearchCriteriaFromQueryParams(queryParams: any): void {
    // Extract and set relevant search criteria based on queryParams
    // For example, this.sortBy = queryParams['sortBy'] || '';
    // Update other properties like searchQuery, selectedCategory, locationQuery as needed
    this.searchQuery = queryParams['search']
      ? queryParams['search'].split(',')
      : [];
    this.selectedCategory = queryParams['category']
      ? queryParams['category'].split(',').map(Number)
      : [];
    this.locationQuery = queryParams['region']
      ? queryParams['region'].split(',')
      : [];
  }

  searchEvents(clearInput?: boolean): void {
    if (clearInput) {
      this.searchQuery = [];
    }
    let query = this.buildQuery();
    this.getEvents(query);
  }

  buildQuery(): string {
    let queryParts = [];

    if (this.searchQuery.length > 0) {
      queryParts.push(`search=${this.searchQuery}`);
    }

    if (this.selectedCategory.length > 0) {
      this.selectedCategory.forEach((category) => {
        queryParts.push(`category=${category}`);
      });
    }

    if (this.locationQuery.length > 0) {
      this.locationQuery.forEach((location) => {
        queryParts.push(`region=${location}`);
      });
    }

    return queryParts.join('&');
  }

  getEvents(query: string = '') {
    this.isLoadingEvents.emit(true);
    const fetchMethod =
      this.parent == 'favourites'
        ? () => this.eventService.getMyFavourites(query)
        : () => this.eventService.getEvents(query);
    this.eventsSubscription = fetchMethod().subscribe({
      next: (events) => {
        this.filteredEvents.emit(events.results);
        this.isLoadingEvents.emit(false);
      },
      error: (err) => this.handleEventFetchError(err),
    });
  }

  handleEventFetchError(err: any): void {
    if (err.error) {
      this.toasterMessage = err.error.error;
      this.toasterType = 'error';
      setTimeout(() => this.resetToasters(), 5000);
    }
  }

  resetToasters() {
    this.toasterMessage = '';
    this.toasterType = '';
  }

  clearUrlQuery(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true,
    });
  }
}
