import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.httpClient.post<any>(`http://localhost:3000/session/`, {
        login,
        password
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
