import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { EventService } from './event.service';
import { Event } from '../_models/event';

@Injectable()
export class EventResolver implements Resolve<Event> {
    constructor(
        private eventService: EventService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Event> {
        return this.eventService.getEvent(route.params.id);
    }
}
