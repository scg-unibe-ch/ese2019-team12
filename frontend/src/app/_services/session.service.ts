import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  currentUser: User;

  constructor(
    private httpClient: HttpClient
  ) { }

  loadUser() {
    let user = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      this.currentUser = new User(user['id'], user['username'], user['firstname'], user['lastname'], user['email'], '', user['role']);
    }
  }
  login(login: string, password: string) {
    return this.httpClient.post<any>(`http://localhost:3000/session/login`, {
        "login": login,
        "password": password
      }).pipe(tap((res) => this.setSession(res)));
  }

  setSession(loginResult) {
    localStorage.setItem('token', loginResult.token);
    localStorage.setItem('expires_at', loginResult.expiresAt);
  }

  public isLoggedIn() {
    return Date.now() < this.getExpiration();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
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
  }
}
