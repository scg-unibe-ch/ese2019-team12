import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { SessionService } from './session.service';

import { User } from '../_models/user';

@Injectable()
export class ProfileResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<User> {
        const currentUser = this.sessionService.getCurrentUser();
        const userId = (route.params.id === 'me') ? currentUser.id : route.params.id;
        return this.userService.getUser(userId);
    }
}
