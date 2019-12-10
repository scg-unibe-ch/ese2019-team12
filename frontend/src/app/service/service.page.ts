import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { SessionService } from '../_services/session.service';
import { ServiceService } from '../_services/service.service';
import { UserService } from '../_services/user.service';
import { EventService } from '../_services/event.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { Service } from '../_models/service';
import { Event } from '../_models/event';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
    @ViewChild('eventSelect', {static: false}) eventSelect: IonSelect;

    isLoggedIn: boolean;
    isMyService: boolean;
    flag = false; // thank ionic for that, firing the onChange twice of select...
    currentUser: User;
    currentUserEvents = [];
    selectedEventId: number;
    serviceUser = new User(null, '', '', '', '', '', '', Role.User);
    service: Service;
    serviceImage: SafeUrl;
    serviceHasImage: boolean;
    imageToUpload: File;
    serviceTags: string[];
    isEditing: boolean;
    editForm: FormGroup;
    event: Event;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private userService: UserService,
        private eventService: EventService,
        private sanitizer: DomSanitizer,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.isEditing = false;
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
            this.getCurrentUserEvents();
        }

        this.route.data.subscribe(
            (data: {service: Service}) => {
                this.service = data.service;
                this.serviceTags = this.service.tags;

                this.serviceService.downloadImage(this.service.id).subscribe(
                    data => {
                        this.serviceHasImage = (data.size > 0);
                        const objectURL = URL.createObjectURL(data);
                        this.serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    },
                );

                // if its yours, its true
                this.isMyService = (this.isLoggedIn) ? (this.service.userId === this.currentUser.id) : false;

                if (!this.isMyService) {
                    this.getServiceUser();
                } else {
                    this.serviceUser = this.currentUser;
                }

                this.editForm = new FormGroup({
                    title: new FormControl(this.service.title, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü0-9., ]*')]),
                    description: new FormControl(this.service.description, [Validators.required, Validators.maxLength(200)]),
                    price: new FormControl(this.service.price, [Validators.required]),
                    file: new FormControl(''),
                    tagInput: new FormControl('')
                });
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }

    getServiceUser() {
        this.userService.getUser(this.service.userId).subscribe(
            (data: User) => {
                this.serviceUser = data;
            }
        );
    }

    getCurrentUserEvents() {
        this.eventService.getEventsOfUser(this.currentUser.id).subscribe(
            data => {
                this.currentUserEvents = data;
            }
        );
    }

    addToExistingEvent() {
        this.flag = !this.flag;
        if (this.flag) {
            this.selectedEventId = +this.selectedEventId; // unary selector to cast to number type
            const selectedEvent: Event = this.currentUserEvents.find(event => {
                return (this.selectedEventId === event.id);
            });

            const serviceIds: number[] = selectedEvent.services.map(service => {
                return service.id;
            });

            serviceIds.push(this.service.id);
            selectedEvent.services = serviceIds;


            this.eventService.update(selectedEvent).subscribe(
                data => {
                    this.router.navigate(['/event/' + selectedEvent.id]);
                }
            );
            this.presentAlert(selectedEvent, this.service);
        }
    }

    openEventSelect() {
        this.eventSelect.open();
    }

    editService() {
        this.isEditing = true;
    }

    processImage(event) {
         this.imageToUpload = (event.target as HTMLInputElement).files[0];
         const objectURL = URL.createObjectURL(this.imageToUpload);
         this.serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
         this.serviceHasImage = true;
    }

    tagsParser() {
        const input = this.editForm.get('tagInput').value;
        if (input.slice(-1) === ',') {
            this.createChip(input.slice(0, -1));
            this.editForm.get('tagInput').setValue('');
        }
    }

    createChip(chipToAdd) {
        if (!this.serviceTags.includes(chipToAdd)) {
            this.serviceTags.push(chipToAdd);
        }
    }

    deleteChip(chipToDelete) {
        this.serviceTags = this.serviceTags.filter(chip => {
            return chip !== chipToDelete;
        });
    }

    saveService(event) {
        this.service.title = this.editForm.get('title').value;
        this.service.description = this.editForm.get('description').value;
        this.service.price = this.editForm.get('price').value;
        this.service.tags = this.serviceTags;

        this.serviceService.update(this.service).subscribe(
            (data) => {
                if (this.imageToUpload) {
                    this.serviceService.uploadImage(this.service.id, this.imageToUpload).subscribe(
                        (data) => {}
                    );
                }
            }
        );
        this.isEditing = false;
    }

    deleteService() {
        this.serviceService.delete(this.service.id).subscribe( () => {
            this.router.navigate(['/profile/me']);
        });
    }

    async presentAlert(selectedEvent: Event, selectedService: Service) {
        const alert = await this.alertController.create({
        header: 'New Service added',
        subHeader: 'You just added the service "' + selectedService.title + '" to your event "' + selectedEvent.name + '".',
        message: 'Please check your profile to view it and to send the service provider an email.',
        buttons: ['OK']
    });
        await alert.present();
    }

}