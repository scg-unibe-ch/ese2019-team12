import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { EventService } from '../_services/event.service';
import { User } from '../_models/user';
import { Event } from '../_models/event';
import { Role } from '../_models/role';

@Component({
    selector: 'app-event-creator',
    templateUrl: './event-creator.page.html',
    styleUrls: ['./event-creator.page.scss'],
})
export class EventCreatorPage implements OnInit {

    isLoggedIn: boolean;
    currentUser: User;
    eventForm: FormGroup;
    serviceIdToAdd: number;
    servicesToAdd: number[];
    event = new Event(null, null, '', '', '', []);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private eventService: EventService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.serviceIdToAdd = (data.serviceId) ? data.serviceId : 0;
        });

        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }

        this.eventForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9., ]*')]),
            description: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('[A-zÄ-ü0-9., ]*')]),
            date: new FormControl('', [Validators.required])
        });
    }

    createEvent(event) {
        this.event.name = this.eventForm.get('name').value;
        this.event.description = this.eventForm.get('description').value;
        this.event.date = this.eventForm.get('date').value;
        this.event.userId = this.currentUser.id;

        this.servicesToAdd = this.event.services.map(service => {
            return service.id;
        })

        if (this.serviceIdToAdd > 0) {
            this.servicesToAdd.push(this.serviceIdToAdd);
        }

        this.event.services = this.servicesToAdd;

        this.eventService.create(this.event).subscribe(
            data => {
                // console.log(data);
                this.router.navigate(['/profile/me']);
            }
        )

    }

}
