import { SessionService } from '../_services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private session: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.session.getCurrentUser();

    if (user && user.role === next.data.role) {
      return true;
    }

    this.router.navigate(['/404']);
    return false;
  }
}
