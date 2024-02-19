import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

const { baseUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventSubject = new BehaviorSubject<Event | null>(null);
  event$ = this.eventSubject.asObservable();

  private paginatedEventsSubject = new BehaviorSubject<any>([]);
  paginatedEventsSubscription$ = this.paginatedEventsSubject.asObservable();

  private favouriteEvents = new BehaviorSubject<Event[]>([]);
  favouriteEvents$ = this.favouriteEvents.asObservable();

  private unlikedEvent = new BehaviorSubject<string>('');
  unlikedEvent$ = this.unlikedEvent.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  createEvent(eventData: any): Observable<Event> {
    const accessToken = this.authService.getUserToken();
    return this.http.post<Event>(`${baseUrl}/events/register`, eventData, {
      headers: {
        'X-Authorization': accessToken!,
        'Content-Type': 'application/json',
      },
    });
  }

  editEvent(eventData: any, eventId: string) {
    const accessToken = this.authService.getUserToken();
    return this.http.put<Event>(`${baseUrl}/events/${eventId}`, eventData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': accessToken!,
      },
    });
  }

  // get events and set them in the events subject
  getEvents(query: string = ''): Observable<any> {
    if (query) {
      return this.http.get<Event[]>(`${baseUrl}/events?${query}`);
      // .pipe(tap((eventData) => this.setEventsInSubject(eventData)));
    }
    return this.http.get<Event[]>(`${baseUrl}/events`);
    // .pipe(tap((eventData) => this.setEventsInSubject(eventData)));
  }

  getEvent(id: string) {
    return this.http
      .get<Event>(`${baseUrl}/events/${id}`)
      .pipe(tap((eventData) => this.setEventsInSubject(eventData)));
  }

  // pass a isDeleted object with isDeleted: boolean property
  deleteEvent(isDeleted: {}, id: string): Observable<Event> {
    const accessToken = this.authService.getUserToken();
    return this.http.put<Event>(
      `${baseUrl}/events/deleteRestoreEvent/${id}`,
      isDeleted,
      {
        headers: {
          'X-Authorization': accessToken!,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  likeUnlikeEvent(eventId: string, userId: string): Observable<string> {
    const accessToken = this.authService.getUserToken();

    return this.http
      .post<string>(`${baseUrl}/events/like/${eventId}`, null, {
        headers: {
          'X-Authorization': accessToken!,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          // Get the current events array
          const event = this.eventSubject.getValue();

          const favouriteEvents = this.favouriteEvents.getValue();

          if (response === 'Event UnLiked!') {
            const userIndex = event?.likes.indexOf(userId);
            const eventIndex = favouriteEvents.findIndex(
              (event) => event._id === eventId
            );

            if (userIndex !== -1) {
              // Remove the userId from likes array
              event?.likes.splice(userIndex!, 1);
            }

            // Remove the event from the favourite events subject
            if (eventIndex !== -1) {
              this.unlikedEvent.next(eventId);
              favouriteEvents.splice(eventIndex, 1);
            }
          } else {
            // Add userId to likes array
            event?.likes.push(userId);
          }

          // Update the event in the BehaviorSubject
          this.eventSubject.next(event);

          // Update the favourite events in BehaviorSubject
          this.setFavouriteEvents(favouriteEvents);
        })
      );
  }

  getPaginationEvents(page: number, limit: number): Observable<any> {
    const url = `${baseUrl}/events?page=${page}&limit=${limit}`;
    return this.http.get(url).pipe(
      tap((paginatedEvents) => {
        this.paginatedEventsSubject.next(paginatedEvents);
      })
    );
  }

  getMonthEvents(yearMonth: string) {
    return this.http.get<Event>(`${baseUrl}/events/month/${yearMonth}`);
  }

  resetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${baseUrl}/user/resetPassword`, {
      to: email,
    });
  }

  // set events array
  setEventsInSubject(event: Event): void {
    this.eventSubject.next(event);
  }

  getMyFavourites(query: string = ''): Observable<Event[]> {
    const accessToken = this.authService.getUserToken();
    if (query) {
      return this.http
        .get<Event[]>(`${baseUrl}/user/getMyFavourites/?${query}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken!,
          },
        })
        .pipe(tap((events: any) => this.setFavouriteEvents(events.results)));
    }
    return this.http
      .get<Event[]>(`${baseUrl}/user/getMyFavourites`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': accessToken!,
        },
      })
      .pipe(tap((events: any) => this.setFavouriteEvents(events.results)));
  }

  setFavouriteEvents(events: Event[]) {
    this.favouriteEvents.next(events);
  }
}
