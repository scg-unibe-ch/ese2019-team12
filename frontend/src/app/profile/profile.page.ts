import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { ServiceService } from '../_services/service.service';
import { EventService } from '../_services/event.service';
import { User } from '../_models/user';
import { Service } from '../_models/service';
import { Event } from '../_models/event';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    profile: User;
    isMe: boolean;
    currentUser: User;
    isLoggedIn: boolean;
    isEditing: boolean;
    editForm: FormGroup;
    services: Service[] = [];
    events: Event[] = [];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sessionService: SessionService,
      private userService: UserService,
      private serviceService: ServiceService,
      private eventService: EventService
    ) {}

    ngOnInit() {
        this.isEditing = false;
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }
        this.route.data.subscribe(
            (data: {profile: User}) => {
                this.profile = data.profile;
                // if its you, its true :)
                this.isMe = (this.isLoggedIn) ? (this.profile.id === this.currentUser.id) : false;

                this.editForm = new FormGroup({
                    firstname: new FormControl(this.profile.firstname, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    lastname: new FormControl(this.profile.lastname, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    bio: new FormControl(this.profile.bio, [Validators.maxLength(500)])
                });

                this.getServicesOfUser();
                if (this.isMe) {
                    this.getEventsOfUser();
                }
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }

    getServicesOfUser() {
        this.serviceService.getServicesOfUser(this.profile.id).subscribe(
            (data) => {
                this.services = data;
            }
        );
    }

    getEventsOfUser() {
        this.eventService.getEventsOfUser(this.profile.id).subscribe(
            (data) => {
                this.events = data;
            }
        )
    }

    editProfilePage() {
        this.isEditing = true;
    }

    saveProfile(event) {
        this.profile.firstname = this.editForm.get('firstname').value;
        this.profile.lastname = this.editForm.get('lastname').value;
        this.profile.bio = this.editForm.get('bio').value;

        this.userService.update(this.profile).subscribe(
            data => {
                console.log(data);
            }
        );
        this.isEditing = false;
    }
}
