import { Injectable } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private _session: SessionService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._session.isLoggedIn()) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
}
