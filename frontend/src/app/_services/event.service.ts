import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Event } from '../_models/event';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    /**
    * The url to the Rest-API.
    */
    apiUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    /**
     * Gets all events of a user from the database.
     * @param  id the user to load all events from.
     * @return Obserable Event[], an Observable object.
     */
    getEventsOfUser(id: number): Observable<Event[]> {
        return this.httpClient.get<Event[]>(this.apiUrl + '/events/user/' + id);
    }

    /**
     * Gets a specific event from the database.
     * @param  id the eventId of the event to get.
     * @return Obserable Event, an Observable object.
     */
    getEvent(id: number): Observable<Event> {
        return this.httpClient.get<Event>(this.apiUrl + '/events/' + id);
    }

    /**
     * Creates a new event in the database.
     * @param  event the event to create.
     * @return Obserable Event, an Observable object.
     */
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

    /**
     * Updates an event from the database.
     * @param  event the event to update.
     * @return Obserable any, an Observable object.
     */
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

    /**
     * Deletes an event from the database.
     * @param  id the event to delete.
     * @return Obserable any, an Observable object.
     */
    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/events/' + id);
    }
}
