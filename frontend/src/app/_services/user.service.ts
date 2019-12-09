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
    return this.httpClient.get<User>(this.apiUrl + '/users/' + id);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + '/users/', {
      lastname: user.firstname,
      firstname: user.lastname,
      username: user.username,
      email: user.email,
      bio: '',
      password: user.password,
      role: user.role
    });
  }

  isUsernameTaken(username): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/users/search/?username=' + username);
  }

  isEmailTaken(email): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/users/search/?email=' + email);
  }

  uploadImage(id: number, file: File): Observable<any> {
      let input = new FormData();
      input.append('user_image', file);
      return this.httpClient.post<File>(this.apiUrl + '/users/' + id + '/image', input);
  }

  downloadImage(id: number): Observable<Blob> {
      return this.httpClient.get(this.apiUrl + '/users/' + id + '/image', { responseType: 'blob' });
  }

  update(user: User): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/users/' + user.id, {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      bio: user.bio,
      password: user.password,
      role: user.role
    });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/users' + id);
  }
}
