import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private sessionService: SessionService) { }

  ngOnInit() {}

  login(event) {
    this.sessionService.login('mail@joghurt.yo', 'verysecure').subscribe();
  }
}
