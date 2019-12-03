import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { EventService } from '../_services/event.service';
import { Service } from '../_models/service';
import { User } from '../_models/user';
import { Event } from '../_models/event';
import { Role } from '../_models/role';
import { Event } from '../_models/event';

@Component({
    selector: 'app-event-creator',
    templateUrl: './event-creator.page.html',
    styleUrls: ['./event-creator.page.scss'],
})
export class EventCreatorPage implements OnInit {

    isLoggedIn: boolean;
    currentUser: User;
    eventForm: FormGroup;
    serviceToAdd: Service;
    event: Event;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private eventService: EventService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: Service) => {
                this.serviceToAdd = data;
                console.log("data");
                console.log(data);

                this.isLoggedIn = this.sessionService.isLoggedIn();
                if (this.isLoggedIn) {
                    this.currentUser = this.sessionService.getCurrentUser();
                }

                this.eventForm = new FormGroup({
                    name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9 ]*')]),
                    description: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('[A-zÄ-ü0-9 ]*')]),
                    date: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9 ]*')])
                });
            }
        )
    }

    createEvent(event) {
        this.event.name = this.eventForm.get('name').value;
        this.event.description = this.eventForm.get('description').value;
        this.event.date = this.eventForm.get('date').value;
        this.event.userId = this.currentUser.id;

        // add service if accessed from "add service to new event")

        this.eventService.create(this.event).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/profile/me']);
            }
        )

    }

}
