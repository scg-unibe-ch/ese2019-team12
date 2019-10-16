import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
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
    user = new User(null, '', '', '', '');
    password = '';

    constructor(private userService: UserService) { }

    ngOnInit() {
        let EMAILPATTERN = /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let STRGPWPATTERN = ".*"  //Needed (ngPattern surrounds with ^ and $)
          + "(?=^.{8,}$)"       //At least 8 Characters
          + "(?=[^\\d]*\\d)"    //At least one digit
          + "(?=[^\\W]*\\W)"    //At least one special character
          + "(?=[^a-z]*[a-z])"  //At least one lowercase character
          + ".*";    //Needed (ngPattern surrounds with ^ and $)

        this.registrationForm = new FormGroup({
             firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
             email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
        });
        this.passwordForm = new FormGroup({
             password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(STRGPWPATTERN)]),
             confirmPassword: new FormControl ('', [Validators.required])
     // },{validator: this.MustMatch
     }, (formGroup: FormGroup) => {
	 return Passwordvalidator.areEqual(formGroup);
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
   //  MustMatch(group: FormGroup) { // here we have the 'passwords' group
   //     let pass = group.get('password').value;
   //     let confirmPass = group.get('confirmPass').value;
   //
   //     return pass === confirmPass ? null : { notSame: true }
   // }


  }
