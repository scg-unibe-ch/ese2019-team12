import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    user: User;

    firstName: string;
    lastName: string;

    constructor() { }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setUserName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getUserName() {
        return this.firstName + ' ' + this.lastName;
    }
}
