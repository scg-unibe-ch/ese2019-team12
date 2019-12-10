import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { EventService } from '../_services/event.service';
import { User } from '../_models/user';
import { Event } from '../_models/event';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-event-creator',
    templateUrl: './event-creator.page.html',
    styleUrls: ['./event-creator.page.scss'],
})
export class EventCreatorPage implements OnInit {

    /**
     * currentUser: User, the user currently logged in.
     * serviceIdToAdd: number, the number of the services to add
     * servicesToAdd: number[],
     * event: Event, the event created by this page.
     */
    currentUser: User;
    eventForm: FormGroup;
    serviceIdToAdd: number;
    servicesToAdd: number[] = [];
    event = new Event(null, null, '', '', '', []);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private eventService: EventService,
        private alertController: AlertController
    ) { }

    ngOnInit() {
        // either 0 if not set, or route.param.id if set in route.
        this.route.data.subscribe(data => {
            this.serviceIdToAdd = (data.serviceId) ? data.serviceId : 0;
        });

        this.currentUser = this.sessionService.getCurrentUser();

        this.eventForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            date: new FormControl('', [Validators.required])
        });
    }

    /**
     * Creates a new event based on the users imput / the selected route.
     */
    createEvent(event) {
        this.event.name = this.eventForm.get('name').value;
        this.event.description = this.eventForm.get('description').value;
        this.event.date = this.eventForm.get('date').value;
        this.event.userId = this.currentUser.id;

        if (this.serviceIdToAdd > 0) {
            this.servicesToAdd.push(this.serviceIdToAdd);
        }

        this.event.services = this.servicesToAdd;

        this.eventService.create(this.event).subscribe(
            data => {
                this.router.navigate(['/event/' + data.id]);
            }
        );

        if (this.serviceIdToAdd > 0) {
            this.presentAlert(this.event);
        }
    }

    /**
     * Alerts the user if event has been created with a service.
     * @param  selectedEvent the Event created.
     */
    async presentAlert(selectedEvent: Event) {
        const alert = await this.alertController.create({
        header: 'New Service added',
        subHeader: 'You just added a service to your newly created event "' + selectedEvent.name + '".',
        message: 'Click the user label on the service to send the service provider an email.',
        buttons: ['OK']
    });
        await alert.present();
    }
}
