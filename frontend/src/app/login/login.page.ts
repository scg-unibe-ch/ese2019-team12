import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private sessionService: SessionService) { }

  credentials = {};

  ngOnInit() {}

  login(event) {
    // this is a test user, form input is stored in this.credentials
    this.sessionService.login('jony@jon.com', 'hello').subscribe(data => {
        console.log(data);
    });
  }
}
