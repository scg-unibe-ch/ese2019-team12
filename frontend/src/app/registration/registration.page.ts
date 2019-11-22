import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';


// import custom validator to validate that password and confirm password fields match
import { PasswordValidator } from '../_validators/password-validator';
import { AsyncValidators } from '../_validators/async-validators';

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

    constructor(
        public userService: UserService,
        public formBuilder: FormBuilder,
        public router: Router,
        public sessionService: SessionService
    ) {
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
            email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)], AsyncValidators.checkEmail(this.userService)),
            username: new FormControl('',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern('[a-zA-Z ]*')
                ],
                    AsyncValidators.checkUsername(this.userService)
            )
        });
        this.passwordForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8),
                Validators.maxLength(12), Validators.pattern(STRGPWPATTERN)]),
            confirmPassword: new FormControl ('', [Validators.required])
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });
    }

    ngOnInit() {
    }

    // Processes the given Inputs to be stored in the Back-End.
    processForm(event) {
        this.user.firstName = this.registrationForm.get('firstName').value;
        this.user.lastName = this.registrationForm.get('lastName').value;
        this.user.email = this.registrationForm.get('email').value;
        this.user.password = this.passwordForm.get('password').value;
        console.log(this.user);

        // this.userService.create(this.user).subscribe(
        //     data => {
        //         console.log(data);
        //         this.sessionService.login(this.user.email, this.user.password).subscribe(
        //             data => {
        //                 console.log(data);
        //                 this.router.navigate(['/explore']);
        //             },
        //             (err: any) => {
        //                 if (err.status === 401) {
        //                     console.log("Error message: " + err.message);
        //                 }
        //             }
        //         );
        //     },
        //     (err: any) => {
        //         console.log("Error message: " + err.message)
        //     }
        // );
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
