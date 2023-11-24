import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from 'src/shared/interfaces/Event';

const {baseUrl} = environment;
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}
    
    getEvents(){
      return this.http.get<Event>(`${baseUrl}/event`);
    }

    getEvent(id: string){
      return this.http.get<Event>(`${baseUrl}/event/${id}`);
    }
}
