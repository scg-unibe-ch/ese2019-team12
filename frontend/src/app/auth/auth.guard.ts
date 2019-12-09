import { Injectable } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private session: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.session.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/explore']);
    return false;
  }
}
