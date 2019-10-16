import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import custom validator to validate that password and confirm password fields match
// import { MustMatch } from '../_services/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    user = new User(null, '', '', '', '');
    password = '';

    constructor(private userService: UserService) { }

    ngOnInit() {
        let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.registrationForm = new FormGroup({
             firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
             password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
             confirmPassword: new FormControl ('', [Validators.required])
         });
    }



  // Processes the given Inputs to be stored in the Back-End. Also gives a quick welcome-message
    processForm(event) {
        // event.preventDefault();
        console.log(this.user)
        // this.user.firstName = new FormControl('text')
        alert('Thank you '+this.user.firstname+' '+this.user.lastname+' for signing up on \"ExWi-Tinder\"');
        console.log(this.userService.create(this.user).subscribe());
    }
  }
