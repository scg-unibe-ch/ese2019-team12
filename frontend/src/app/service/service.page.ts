import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../_services/session.service';
import { ServiceService } from '../_services/service.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { Service } from '../_models/service';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

    isLoggedIn: boolean;
    currentUser: User;
    service: Service;
    serviceTags: string[];
    isEditing: boolean;
    editForm: FormGroup;
    isMyService: boolean;
    serviceUser = new User(null, '', '', '', '', '', '', Role.User);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.isEditing = false;
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }
        this.route.data.subscribe(
            (data: {service: Service}) => {
                this.service = data.service;
                this.serviceTags = this.service.tags;
                console.log(this.service);

                // if its yours, its true
                this.isMyService = (this.isLoggedIn) ? (this.service.userId === this.currentUser.id) : false;

                if (!this.isMyService) {
                    this.getServiceUser();
                } else {
                    this.serviceUser = this.currentUser;
                }

                this.editForm = new FormGroup({
                    title: new FormControl(this.service.title, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    description: new FormControl(this.service.description, [Validators.required, Validators.maxLength(200)]),
                    price: new FormControl(this.service.price, [Validators.required]),
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

    editService() {
        this.isEditing = true;
    }

    tagsParser() {
        let input = this.editForm.get('tagInput').value;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.editForm.get('tagInput').setValue("");
        }
    }

    createChip(chipToAdd) {
        if (!this.serviceTags.includes(chipToAdd)) {
            this.serviceTags.push(chipToAdd);
        }
    }

    deleteChip(chipToDelete) {
        this.serviceTags = this.serviceTags.filter(chip => {
            return chip != chipToDelete;
        })
    }

    saveService(event) {
        this.service.title = this.editForm.get('title').value;
        this.service.description = this.editForm.get('description').value;
        this.service.price = this.editForm.get('price').value;
        this.service.tags = this.serviceTags;

        this.serviceService.update(this.service).subscribe(
            data => {
                // this 'update' is not working either...
                console.log(data);
            }
        );
        this.isEditing = false;
    }

    deleteService() {
        this.serviceService.delete(this.service.id).subscribe( () => {
            this.router.navigate(['/profile/me']);
        })
    }

}
