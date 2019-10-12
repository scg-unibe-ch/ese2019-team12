import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() {}

    user = new User(null, '', '', '', '');
    password = '';

  // Processes the given Inputs to be stored in the Back-End. Also gives a quick welcome-message
    processForm(event) {
        // event.preventDefault();
        console.log(this.user)
        // this.user.firstName = new FormControl('text')
        alert('Thank you '+this.user.firstname+' '+this.user.lastname+' for signing up on \"ExWi-Tinder\"');
        console.log(this.userService.create(this.user).subscribe());
    }
  }
