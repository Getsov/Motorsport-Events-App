import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';
import { Observable } from 'rxjs';

const { baseUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
    
    getEvents(query:string = ''): Observable<Event[]>{
      if(query){
        return this.http.get<Event[]>(`${baseUrl}/events?${query}`);
      }
      return this.http.get<Event[]>(`${baseUrl}/events`);
    }

  getEvent(id: string) {
    return this.http.get<Event>(`${baseUrl}/events/${id}`);
  }

  getPaginationEvents(page: number, limit: number): Observable<any> {
    const url = `${baseUrl}/events?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }
}
