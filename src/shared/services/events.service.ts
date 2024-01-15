import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const { baseUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class EventsService {
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

  getEvents(query: string = ''): Observable<Event[]> {
    if (query) {
      return this.http.get<Event[]>(`${baseUrl}/events?${query}`);
    }
    return this.http.get<Event[]>(`${baseUrl}/events`);
  }

  getEvent(id: string) {
    return this.http.get<Event>(`${baseUrl}/events/${id}`);
  }

  deleteEvent(eventData: {}, id: string):Observable<Event> {
    const accessToken = this.authService.getUserToken();
    return this.http.put<Event>(`${baseUrl}/events/${id}`, eventData, {
      headers: {
        'X-Authorization': accessToken!,
        'Content-Type': 'application/json'
      }
    })
  }

  getPaginationEvents(page: number, limit: number): Observable<any> {
    const url = `${baseUrl}/events?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }

  getMonthEvents(yearMonth: string) {
    return this.http.get<Event>(`${baseUrl}/events/month/${yearMonth}`);
  }

  getMyFavourites(): Observable<Event[]>{
    const accessToken = this.authService.getUserToken();
    return this.http.get<Event[]>(`${baseUrl}/user/getMyFavourites`,{
      
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': accessToken!,
        }
    }
    );
  }
}
