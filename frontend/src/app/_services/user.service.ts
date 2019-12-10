import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    /**
     * The url to the Rest-API.
     */
    apiUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) { }

    /**
     * Gets all users from the database.
     * @return Observable User[], an Observable object.
     */
    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl + '/users');
    }

    /**
     * Gets a user by id from the database.
     * @return Observable User, an Observable object.
     */
    getUser(id: number): Observable<User> {
        return this.httpClient.get<User>(this.apiUrl + '/users/' + id);
    }

    /**
     * Creates a new user in the database.
     * @return Observable User, an Observable object.
     */
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

    /**
     * Checks if a username is already taken.
     * @param username the username to check.
     * @return Observable User, an Observable object.
     */
    isUsernameTaken(username): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/users/search/?username=' + username);
    }

    /**
     * Checks if an email is already taken
     * @param  email the email to check.
     * @return Observable User, an Observable object.
     */
    isEmailTaken(email): Observable<any> {
        return this.httpClient.get<any>(this.apiUrl + '/users/search/?email=' + email);
    }

    /**
     * Uploads an image to a certain user.
     * @param  id   userId to add the image to.
     * @param  file the image.
     */
    uploadImage(id: number, file: File): Observable<any> {
        const input = new FormData();
        input.append('user_image', file);
        return this.httpClient.post<File>(this.apiUrl + '/users/' + id + '/image', input);
    }

    /**
     * Downloads the image of a certain user.
     * @param  id userId to get the image from.
     * @return  Observable Blob, an Observable object.
     */
    downloadImage(id: number): Observable<Blob> {
        return this.httpClient.get(this.apiUrl + '/users/' + id + '/image', { responseType: 'blob' });
    }

    /**
     * Updates user data.
     * @param  user the user to update.
     * @return  Observable any, an Observable object.
     */
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

    /**
     * Deletes a user.
     * @param  id the userId to delete.
     * @return Observable any, an Observable object.
     */
    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/users' + id);
    }
}
