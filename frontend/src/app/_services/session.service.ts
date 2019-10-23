import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUser: User;

  constructor(
    private httpClient: HttpClient
  ) { this.loadUser(); }

  loadUser() {
    let user = localStorage.getItem('currentUser');
    if(user) {
      user = JSON.parse(user);
      this.currentUser = new User(user['id'], user['username'], user['firstname'], user['lastname'], user['email'], '', user['role']);
    }
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(`localhost:3000/session/create`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = new User(user['id'], user['username'], user['firstname'], user['lastname'], user['email'], '', user['role']);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
