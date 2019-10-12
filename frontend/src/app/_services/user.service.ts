import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get('http://localhost:3000/users');
  }
  getUser(user: number): Observable<User> {
    return this.httpClient.get('http://localhost:3000/users/' + id);
  }

  create(user: User) Observable<User> {
    return this.httpClient.post('http://localhost:3000/users/', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    });
  }
  update(id: number): Observable<any> {
    return this.httpClient.put('http://localhost:3000/users/' + id).subscribe();
  }
  delete(id: number): Observable<Hero> {
    return this.httpClient.delete('http://localhost:3000/users' + id).subscribe();
  }
}
