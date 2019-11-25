import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFailed: boolean;
  loginForm: FormGroup;

  constructor(
      private sessionService : SessionService,
      public formBuilder: FormBuilder,
      private router : Router
  ) {
      this.loginFailed = false;
      this.loginForm = new FormGroup({
          login: new FormControl(''),
          password: new FormControl('')
      });
  }

  ngOnInit() {}

  login(event) {
    let login = this.loginForm.get('login').value;
    let password = this.loginForm.get('password').value;

    // test user: username 'Jony', password 'hello'
    this.sessionService.login(login, password).subscribe(
        data => {
            this.router.navigate(['/explore']);
        },
        (err: any) => {
            if (err.status === 401) {
                this.loginFailed = true;
                console.log("Error message: " + err.message);
            }
        }
    );
  }
}
