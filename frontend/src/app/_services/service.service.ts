import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Service } from '../_models/service';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    apiUrl = 'http://localhost:3000';

    constructor(
        private httpClient: HttpClient
    ) { }

    getServices(): Observable<Service[]> {
        return this.httpClient.get<Service[]>(this.apiUrl + '/services');
    }

    getServicesOfUser(id: number): Observable<Service[]> {
        return this.httpClient.get<Service[]>(this.apiUrl + '/services/user/' + id);
    }

    getService(id: number): Observable<Service> {
        return this.httpClient.get<Service>(this.apiUrl + '/services/' + id);
    }

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

    uploadImage(id: number, file: File): Observable<any> {
        const input = new FormData();
        input.append('service_image', file);
        return this.httpClient.post<File>(this.apiUrl + '/services/' + id + '/image', input);
    }

    downloadImage(id: number): Observable<Blob> {
        return this.httpClient.get(this.apiUrl + '/services/' + id + '/image', { responseType: 'blob' });
    }

    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/services/' + id);
    }
}
