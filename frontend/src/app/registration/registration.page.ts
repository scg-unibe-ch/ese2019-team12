import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { PasswordValidator } from '../_validators/password-validator';
import { UsernameValidator } from '../_validators/username-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
    registrationForm: FormGroup;
    passwordForm: FormGroup;
    usernameForm: FormGroup;
    user = new User(null, '', '', '', '', '', Role.User);
    password = '';



    constructor(private userService: UserService, public formBuilder: FormBuilder) { }

    ngOnInit() {
        const EMAILPATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
        const STRGPWPATTERN = '.*'  // Needed (ngPattern surrounds with ^ and $)
            + '(?=^.{8,}$)'       // At least 8 Characters
            + '(?=[^\\d]*\\d)'    // At least one digit
            + '(?=[^\\W]*\\W)'    // At least one special character
            + '(?=[^a-z]*[a-z])'  // At least one lowercase character
            + '.*';    // Needed (ngPattern surrounds with ^ and $)

        this.registrationForm = new FormGroup({
            lastName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
            email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
        });
        this.passwordForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8),
                Validators.maxLength(12), Validators.pattern(STRGPWPATTERN)]),
            confirmPassword: new FormControl ('', [Validators.required])
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });
        this.usernameForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])
        });
    }

    // Processes the given Inputs to be stored in the Back-End.
    processForm(event) {
    // how do we create a unique id?
    console.log(this.user);
    // this.userService.create(this.user).subscribe();
    }

    showPassword() {
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
