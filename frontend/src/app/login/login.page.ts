import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private sessionService : SessionService, private router : Router) { }

  credentials = {};
  loginFailed : boolean;

  ngOnInit() {
      this.loginFailed = false;
  }

  login(event) {
    // this is a test user, form input is stored in this.credentials
    this.sessionService.login('Jony', 'hello').subscribe(
        data => {
            console.log(data);
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
