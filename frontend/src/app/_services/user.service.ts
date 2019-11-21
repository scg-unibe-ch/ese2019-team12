import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl + '/users');
  }
  
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + '/publicUser/' + id);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + '/publicUser/', {
      lastName: user.firstName,
      firstName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }

  update(user: User): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/users/' + user.id, {
      lastName: user.firstName,
      firstName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/users' + id);
  }
}
