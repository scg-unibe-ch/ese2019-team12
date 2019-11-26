import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { SessionService } from './session.service';
import { ServiceService } from './service.service';

import { Service } from '../_models/service';

@Injectable()
export class ServiceResolver implements Resolve<Service> {
    constructor(
        private userService: UserService,
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Service> {
        return this.serviceService.getService(route.params['id']);
    }
}
