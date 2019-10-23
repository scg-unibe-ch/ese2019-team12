import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  const apiUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl + '/users');
  }
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(apiUrl + '/users/' + id);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(apiUrl + '/users/', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    });
  }

  update(user: User): Observable<any> {
    return this.httpClient.put(apiUrl + '/users/' + user.id, {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(apiUrl + '/users' + id);
  }
}
