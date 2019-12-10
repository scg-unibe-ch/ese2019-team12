import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../_services/event.service';
import { SessionService } from '../_services/session.service';
import { ServiceService } from '../_services/service.service';
import { UserService } from '../_services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Event } from '../_models/event';
import { Service } from '../_models/service';
import { User } from '../_models/user';

@Component({
    selector: 'app-events',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

    /**
     * isEditing: boolean, is true if the event data is being edited.
     * editForm: FormGroup, the form used to update the event data.
     * event: Event, the event to display on the page.
     * optimizedServices: [], an array with the fields service, serviceHasImage and serviceImage for every entry.
     * displayDate: string, the date formatted to be displayed to the user (ddmmyyyy);
     * formattedDate: string, the date formatted to be fed into the date input field of the edit form.
     */
    isEditing: boolean;
    editForm: FormGroup;
    currentUser: User;
    event: Event = new Event(null, null, '', '', '', []);
    optimizedServices = [];
    displayDate: string;
    formattedDate: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private eventService: EventService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {

        this.isEditing = false;
        this.currentUser = this.sessionService.getCurrentUser();

        // fetching the event from the api.
        this.route.data.subscribe(
            (data: {event: Event}) => {
                this.event = data.event;
                this.formatDate(this.event.date);
                this.event.services.forEach(service => {
                    // fetching the images of the services of the event from the api.
                    this.serviceService.downloadImage(service.id).subscribe(
                        data => {
                            if (data.size > 0) {
                                const objectURL = URL.createObjectURL(data);
                                const serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                                this.optimizedServices.push({hasImage: true, image: serviceImage, service: service});
                            } else {
                                this.optimizedServices.push({hasImage: false, service: service});
                            }
                        }
                    );
                });

                this.editForm = new FormGroup({
                    name: new FormControl(this.event.name, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9., ]*')]),
                    description: new FormControl(this.event.description, [Validators.required, Validators.maxLength(200), Validators.pattern('[A-zÄ-ü0-9., ]*')]),
                    date: new FormControl(this.formattedDate, [Validators.required])
                });
            }
        );
    }

    /**
     * Toggles the editForm.
     */
    editEvent() {
        this.isEditing = !this.isEditing;
    }

    /**
     * Deletes the loaded event.
     */
    deleteEvent() {
        this.eventService.delete(this.event.id).subscribe(() => {
                this.router.navigate(['/profile/me']);
            }
        );
    }

    /**
     * Saves the edited event to the server.
     */
    saveEvent(event) {
        this.event.name = this.editForm.get('name').value;
        this.event.description = this.editForm.get('description').value;
        this.event.date = this.editForm.get('date').value;
        this.formatDate(this.event.date);
        this.event.services = this.optimizedServices.map(serviceCard => {
            return serviceCard.service.id;
        });

        this.eventService.update(this.event).subscribe(
            data => {}
        );
        this.isEditing = !this.isEditing;
    }

    /**
     * Removes a service from the loaded event.
     * @param  serviceToRemove the service to remove.
     */
    removeService(serviceToRemove) {
        this.optimizedServices = this.optimizedServices.filter(service => {
            return (service !== serviceToRemove);
        });
    }

    /**
     * Parses the dates to display to the user and feed to the input field.
     * @param  date the date in ISO 8601 format.
     */
    formatDate(date) {
        const tempDate = date.slice(0, 10);
        const year = tempDate.slice(0, 4);
        const month = tempDate.slice(5, 7);
        const day = tempDate.slice(8, 10);
        const displayDate = day + '.' + month + '.' + year;
        const formattedDate = year + '-' + month + '-' + day;
        this.displayDate = displayDate;
        this.formattedDate = formattedDate;
    }

    /**
     * Resets the services after leaving the view.
     */
    ionViewDidLeave() {
        this.optimizedServices = [];
    }
}
