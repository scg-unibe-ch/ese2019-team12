import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../_services/event.service';
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
  editForm: FormGroup;
  currentUser: User;
  event: Event = new Event(null, null, '', '', '', []);
  services = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sessionService: SessionService,
      private userService: UserService,
      private eventService: EventService
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

              this.editForm = new FormGroup({
                  name: new FormControl(this.event.name, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9 ]*')]),
                  description: new FormControl(this.event.description, [Validators.required, Validators.maxLength(200), Validators.pattern('[A-zÄ-ü0-9 ]*')]),
                  date: new FormControl(this.event.date, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9 ]*')])
              });

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

  editEvent() {
      this.isEditing = !this.isEditing;
  }

  deleteEvent() {
      this.eventService.delete(this.event.id).subscribe(() => {
              this.router.navigate(['/profile/me']);
          }
      )
  }

  saveEvent(event) {
      this.event.name = this.editForm.get('name').value;
      this.event.description = this.editForm.get('description').value;
      this.event.date = this.editForm.get('date').value;
      this.event.services = this.services.map(serviceCard => {
          return serviceCard.service;
      })

      console.log(this.event);

      // this.eventService.update(this.event).subscribe(
      //     data => {
      //         console.log(data);
      //     }
      // )
      this.isEditing = !this.isEditing;
  }

  removeService(serviceToRemove) {
      this.services = this.services.filter(service => {
          return (service != serviceToRemove);
      })
  }

  ionViewDidLeave() {
      this.services = [];
  }
}
