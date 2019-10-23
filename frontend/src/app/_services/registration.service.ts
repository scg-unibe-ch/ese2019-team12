import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class RegistrationService {
  apiUrl = '';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RegistrationService');
  }

  // /** GET heroes from the server */
  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.apiUrl)
  //     .pipe(
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  /* GET users to check if it already exists */
  searchUsers(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Hero[]>(this.apiUrl, options)
      .pipe(
        catchError(this.handleError<User[]>('searchUsers', []))
      );
  }

  /** POST: add a new user to the database */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }
}
