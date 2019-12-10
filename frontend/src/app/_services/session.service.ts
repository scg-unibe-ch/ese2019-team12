import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @Output()
  currentRole: EventEmitter<any> = new EventEmitter();
  currentUser: User;
  currentUserProfilePicture: SafeUrl;

  apiUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  login(login: string, password: string) {
    return this.httpClient.post<any>(this.apiUrl + `/session/login`, {
        login,
        password
      }).pipe(tap((res) => this.setSession(res)));
  }

  setSession(loginResult) {
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('expires_at', loginResult.expiresAt);
    localStorage.setItem('currentUser', JSON.stringify(loginResult.user));
    this.currentRole.emit(loginResult.user.role);
  }

  public isLoggedIn() {
    return Date.now() < this.getExpiration();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // remove token as well
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.currentRole.emit('None');
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser;
  }

  getCurrentRole() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser.role;
    }
    return 'None';
  }
}
