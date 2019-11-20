import { SessionService } from '../_services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private _session: SessionService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._session.getCurrentUser();

    if (user.role === next.data.role) {
      return true;
    }

    this._router.navigate(['/404']);
    return false;
  }
}
