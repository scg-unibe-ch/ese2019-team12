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

    service: Service;
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
        this.route.data.subscribe(
            (data: {service: Service}) => {
                this.service = data.service;
                console.log(this.service);
                let currentUser = this.sessionService.getCurrentUser();
                // if its yours, its true
                this.isMyService = (currentUser) ? (this.service.userId === currentUser.id) : false;

                if (!this.isMyService) {
                    this.getServiceUser();
                } else {
                    this.serviceUser = currentUser;
                }

                this.editForm = new FormGroup({
                    title: new FormControl(this.service.title, [Validators.required, Validators.maxLength(30), Validators.pattern('[A-zÄ-ü ]*')]),
                    description: new FormControl(this.service.description, [Validators.required, Validators.maxLength(200)])
                    // tags: new FormControl('')
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

    saveService(event) {
        this.service.title = this.editForm.get('title').value;
        this.service.description = this.editForm.get('description').value;

        this.serviceService.update(this.service).subscribe(
            data => {
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
