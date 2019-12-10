import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    /**
    * The url to the Rest-API.
    */
    apiUrl = 'http://localhost:3000';

    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
    ) {}

    /**
     * Logs a user in.
     * @param  login    the user's username or email.
     * @param  password the user's password.
     */
    login(login: string, password: string) {
        return this.httpClient.post<any>(this.apiUrl + `/session/login`, {
            login,
            password
        }).pipe(tap((res) => this.setSession(res)));
    }

    /**
     * Sets localStorageItems for the session.
     * @param  loginResult the response from the login process.
     */
    setSession(loginResult) {
        localStorage.setItem('token', loginResult.token);
        localStorage.setItem('expires_at', loginResult.expiresAt);
        localStorage.setItem('currentUser', JSON.stringify(loginResult.user));
        this.currentRole.emit(loginResult.user.role);
    }

    /**
     * Checks if a user is logged in.
     * @return boolean, true if someone is logged in.
     */
    public isLoggedIn() {
        return Date.now() < this.getExpiration();
    }

    /**
     * Gets expiration of token from localStorage.
     * @return the expiration timestamp.
     */
    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }

    /**
     * Gets the token from localStorage.
     * @return the token.
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Resets localStorage to end the session.
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // remove token as well
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        this.currentRole.emit('None');
    }

    /**
     * Gets the currently logged in user from localStorage.
     * @return the current user.
     */
    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.currentUser;
    }

    /**
     * Gets the role of the currently logged in user.
     * @return the Role.
     */
    getCurrentRole() {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            return currentUser.role;
        }
        return 'None';
    }
}
