import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Event } from '../_models/event';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    apiUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    getEventsOfUser(id: number): Observable<Event[]> {
        return this.httpClient.get<Event[]>(this.apiUrl + '/events/user/' + id);
    }

    getEvent(id: number): Observable<Event> {
        return this.httpClient.get<Event>(this.apiUrl + '/events/' + id);
    }

    create(event: Event): Observable<Event> {
        return this.httpClient.post<Event>(this.apiUrl + '/events/', {
            id: event.id,
            userId: event.userId,
            name: event.name,
            description: event.description,
            date: event.date,
            services: event.services
        });
    }

    update(event: Event): Observable<any> {
        return this.httpClient.put(this.apiUrl + '/events/' + event.id, {
            id: event.id,
            userId: event.userId,
            name: event.name,
            description: event.description,
            date: event.date,
            services: event.services
        });
    }

    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/events/' + id);
    }
}
