import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor( private sessionService: SessionService) { }

  ngOnInit() {}

  login(event) {
    this.sessionService.login('mail@joghurt.yo', 'verysecure').subscribe();
  }
}
