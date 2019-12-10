import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    isLoggedIn: boolean;
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
            (data: {event: Event}) => {
                this.event = data.event;
                this.formatDate(this.event.date);
                this.event.services.forEach(service => {
                    this.serviceService.downloadImage(service.id).subscribe(
                        data => {
                            if (data.size > 0) {
                                const objectURL = URL.createObjectURL(data);
                                const serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                                this.optimizedServices.push({hasImage: true, image: serviceImage, service: service});
                                console.log(this.optimizedServices);
                            } else {
                                this.optimizedServices.push({hasImage: false, service: service});
                                console.log(this.optimizedServices);
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

    editEvent() {
        this.isEditing = !this.isEditing;
    }

    deleteEvent() {
        this.eventService.delete(this.event.id).subscribe(() => {
                this.router.navigate(['/profile/me']);
            }
        );
    }

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

    removeService(serviceToRemove) {
        this.optimizedServices = this.optimizedServices.filter(service => {
            return (service !== serviceToRemove);
        });
    }

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

    ionViewDidLeave() {
        this.optimizedServices = [];
    }
}
