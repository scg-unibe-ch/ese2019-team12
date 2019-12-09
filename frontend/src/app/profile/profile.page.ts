import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    userImage: SafeUrl;
    userHasImage: boolean;
    imageToUpload: File;
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
      private eventService: EventService,
      private sanitizer: DomSanitizer
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
                this.userService.downloadImage(this.profile.id).subscribe(
                    data => {
                        this.userHasImage = (data.size > 0);
                        let objectURL = URL.createObjectURL(data);
                        this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    }
                )

                // if its you, its true :)
                this.isMe = (this.isLoggedIn) ? (this.profile.id === this.currentUser.id) : false;

                this.editForm = new FormGroup({
                    firstname: new FormControl(this.profile.firstname, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    lastname: new FormControl(this.profile.lastname, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    bio: new FormControl(this.profile.bio, [Validators.maxLength(200)]),
                    file: new FormControl('')
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
                if (this.imageToUpload) {
                    this.userService.uploadImage(this.currentUser.id, this.imageToUpload).subscribe(
                        (data) => {}
                    )
                }
            }
        );
        this.isEditing = false;
    }

    processImage(event) {
        this.imageToUpload = (event.target as HTMLInputElement).files[0];
        let objectURL = URL.createObjectURL(this.imageToUpload);
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.userHasImage = true;
    }
}
