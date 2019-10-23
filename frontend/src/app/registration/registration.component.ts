import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { Passwordvalidator } from '../_services/passwordvalidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    passwordForm: FormGroup;
    user = new User(null, '', '', '', '', '', Role.User);
    password = '';

    constructor(private userService: UserService) { }

    ngOnInit() {
        const EMAILPATTERN = /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const STRGPWPATTERN = '.*'  // Needed (ngPattern surrounds with ^ and $)
          + '(?=^.{8,}$)'       // At least 8 Characters
          + '(?=[^\\d]*\\d)'    // At least one digit
          + '(?=[^\\W]*\\W)'    // At least one special character
          + '(?=[^a-z]*[a-z])'  // At least one lowercase character
          + '.*';    // Needed (ngPattern surrounds with ^ and $)

        this.registrationForm = new FormGroup({
             firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
        });
        this.passwordForm = new FormGroup({
             password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(STRGPWPATTERN)]),
             confirmPassword: new FormControl ('', [Validators.required])
        }, (formGroup: FormGroup) => {
            return Passwordvalidator.areEqual(formGroup);
        });
    }

    // Processes the given Inputs to be stored in the Back-End. Also gives a quick welcome-message
    processForm(event) {
        // event.preventDefault();
        console.log(this.user);
        // this.user.firstName = new FormControl('text')
        alert('Thank you ' + this.user.firstname + ' ' + this.user.lastname + ' for signing up');
        console.log(this.userService.create(this.user).subscribe());
    }

    showPw() {
        const pw = document.getElementById('password') as HTMLInputElement;
        const confpw = document.getElementById('confirmpassword') as HTMLInputElement;
        const eye = document.getElementById('eye') as HTMLInputElement;
        if (pw.type === 'password') {
            pw.type = 'text';
            confpw.type = 'text';
            eye.name = 'eye';
        } else {
            pw.type = 'password';
            confpw.type = 'password';
            eye.name = 'eye-off';
        }
    }
  }
