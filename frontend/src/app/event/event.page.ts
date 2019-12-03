import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { Event } from '../_models/event';
import { Service } from '../_models/service';
import { User } from '../_models/user';

@Component({
  selector: 'app-events',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  isLoggedIn: boolean;
  isEditing: boolean;
  currentUser: User;
  event: Event;
  services = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sessionService: SessionService,
      private userService: UserService
  ) {}

  ngOnInit() {

      this.isEditing = false;

      this.isLoggedIn = this.sessionService.isLoggedIn();
      if (this.isLoggedIn) {
          this.currentUser = this.sessionService.getCurrentUser();
      }

      this.route.data.subscribe(
          (data: {event: Event}) => {
              this.event = data.event;
              console.log(this.event);
              this.event.services.forEach(service => {
                  this.userService.getUser(service.userId).subscribe(data => {
                      this.services.push({
                          username: data.username,
                          service: service
                      });
                  });
              });
          }
      )
  }
  
  ionViewDidLeave() {
      this.services = [];
  }
}
