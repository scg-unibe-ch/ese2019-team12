import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ServiceService } from './service.service';
import { Service } from '../_models/service';

@Injectable()
export class EventCreatorResolver implements Resolve<Service> {
    constructor(
        private serviceService: ServiceService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Service> {
        console.log("params");
        console.log(route.params['id']);
        return this.serviceService.getService(route.params['id']);
    }
}
