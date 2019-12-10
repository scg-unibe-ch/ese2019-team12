import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

    /**
     * profile: User, to hold the data of the selected profile.
     * isLoggedIn: boolean, is true if a user is logged in while viewing this profile.
     * isMe: boolean, is true when logged in user is viewing his own profile.
     * currentUser: User, the user currently logged in.
     * userImage: SafeUrl, the profile picture of the selected profile.
     * userHasImage: boolean, is true if this profile has a personal profile picture.
     * imageToUpload: File, the image fetched from the editForm.
     * isEditing: boolean, is true when this profile is being edited.
     * editForm: FormGroup, the edit form that allows to change user data.
     * services: Service[], an array of the services provided by this profile/user.
     * optimizedServices: [], an array holding image, hasImage and service for each entry.
     * events: Event[], an array containing all events that this profile/user created.
     * cardsView: boolean, is true/false according to which view (Services, Events) is selected.
     * updateMasonryLayout: boolean, to trigger an update on the masonry grid.
     */
    profile: User;
    isLoggedIn: boolean;
    isMe: boolean;
    currentUser: User;
    userImage: SafeUrl;
    userHasImage: boolean;
    imageToUpload: File;
    isEditing: boolean;
    editForm: FormGroup;
    services: Service[] = [];
    optimizedServices = [];
    events: Event[] = [];
    cardsView: number = 0;
    updateMasonryLayout: boolean;

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
        this.updateMasonryLayout = false;
        this.route.data.subscribe(
            (data: {profile: User}) => {
                this.profile = data.profile;
                this.userService.downloadImage(this.profile.id).subscribe(
                    data => {
                        this.userHasImage = (data.size > 0);
                        const objectURL = URL.createObjectURL(data);
                        this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    }
                );

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

    /**
     * Sends call to API fetching all services of this profile's user.
     */
    getServicesOfUser() {
        this.serviceService.getServicesOfUser(this.profile.id).subscribe(
            (data) => {
                this.services = data;
                this.services.forEach(service => {
                    // download image for each service fetched
                    this.serviceService.downloadImage(service.id).subscribe(
                        data => {
                            if (data.size > 0) {
                                const objectURL = URL.createObjectURL(data);
                                const serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                                this.optimizedServices.push({hasImage: true, image: serviceImage, service});
                            } else {
                                this.optimizedServices.push({hasImage: false, service});
                            }
                            this.updateMasonryLayout = true;
                        }
                    );
                });
            }
        );
    }

    /**
     * Sends call to API fetching all events of this profile's user.
     */
    getEventsOfUser() {
        this.eventService.getEventsOfUser(this.profile.id).subscribe(
            (data) => {
                this.events = data;
                this.updateMasonryLayout = true;
            }
        );
    }

    /**
     * Toggles the editing form to update user data.
     */
    editProfilePage() {
        this.isEditing = true;
    }

    /**
     * Sends the user-data changes to the API, uploads a profile picture if provided.
     */
    saveProfile() {
        this.profile.firstname = this.editForm.get('firstname').value;
        this.profile.lastname = this.editForm.get('lastname').value;
        this.profile.bio = this.editForm.get('bio').value;

        this.userService.update(this.profile).subscribe(
            data => {
                if (this.imageToUpload) {
                    this.userService.uploadImage(this.currentUser.id, this.imageToUpload).subscribe(
                        data => {}
                    );
                }
            }
        );
        this.isEditing = false;
    }

    /**
     * Reads the file inputted by the user and converts it to Type SafeUrl.
     */
    processImage(event) {
        this.imageToUpload = (event.target as HTMLInputElement).files[0];
        const objectURL = URL.createObjectURL(this.imageToUpload);
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.userHasImage = true;
    }

    /**
     * Toggles the view (Services, Events) selected by the user.
     * @param  id the selected view.
     */
    changeViewedCards(id) {
        this.cardsView = id;
        this.updateMasonryLayout = true;
    }

    /**
     * Sets the colors of the labels to switch between the cardsView.
     * @param  id the label id.
     * @return  the color to paint the label as.
     */
    getColorOfTab(id) {
        return (id === this.cardsView) ? '' : 'primary';
    }

    /**
     * Resets services to display when view is left.
     */
    ionViewDidLeave() {
        this.optimizedServices = [];
    }
}
