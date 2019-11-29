import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-events',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  isLoggedIn: boolean;
  currentUser: User;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
      this.isLoggedIn = this.sessionService.isLoggedIn();
      if (this.isLoggedIn) {
          this.currentUser = this.sessionService.getCurrentUser();
      }
  }

}
