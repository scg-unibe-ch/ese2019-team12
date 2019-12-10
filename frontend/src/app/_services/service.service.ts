import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Service } from '../_models/service';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    /**
    * The url to the Rest-API.
    */
    apiUrl = 'http://localhost:3000';

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Gets all services from the database.
     * @return Observable Service[], an Observable object.
     */
    getServices(): Observable<Service[]> {
        return this.httpClient.get<Service[]>(this.apiUrl + '/services');
    }

    /**
     * Gets all services of specific user from the database.
     * @param  id userId to get all services from.
     * @return Observable Service[], an Observable object.
     */
    getServicesOfUser(id: number): Observable<Service[]> {
        return this.httpClient.get<Service[]>(this.apiUrl + '/services/user/' + id);
    }

    /**
     * Gets a specific service from the database.
     * @param  id the serviceId of the service to get.
     * @return Observable Service, an Observable object.
     */
    getService(id: number): Observable<Service> {
        return this.httpClient.get<Service>(this.apiUrl + '/services/' + id);
    }

    /**
     * Creates a new service in the database.
     * @param  service the service to create.
     * @return Observable Service, an Observable object.
     */
    create(service: Service): Observable<Service> {
        return this.httpClient.post<Service>(this.apiUrl + '/services/', {
            id: service.id,
            userId: service.userId,
            title: service.title,
            description: service.description,
            price: service.price,
            tags: service.tags
        });
    }

    /**
     * Updates an existing service in the database.
     * @param  service the service to update.
     * @return Observable Service, an Observable object.
     */
    update(service: Service): Observable<any> {
        return this.httpClient.put(this.apiUrl + '/services/' + service.id, {
            id: service.id,
            userId: service.userId,
            title: service.title,
            description: service.description,
            price: service.price,
            tags: service.tags
        });
    }

    /**
     * Uploads an image to a service in the database.
     * @param  id   the serviceId of the service to add an image to.
     * @param  file the image
     * @return Observable any, an Obserable object.
     */
    uploadImage(id: number, file: File): Observable<any> {
        const input = new FormData();
        input.append('service_image', file);
        return this.httpClient.post<File>(this.apiUrl + '/services/' + id + '/image', input);
    }

    /**
     * Downloads an image of a service in the database.
     * @param  id   the serviceId of the service to get the image from.
     * @return Observable Blob, an Obserable object.
     */
    downloadImage(id: number): Observable<Blob> {
        return this.httpClient.get(this.apiUrl + '/services/' + id + '/image', { responseType: 'blob' });
    }

    /**
     * Deletes a service in the database.
     * @param  id the service to delete.
     * @return Observable any, an Observable object.
     */
    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/services/' + id);
    }
}
