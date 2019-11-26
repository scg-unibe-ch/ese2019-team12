import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
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
    isMyService: boolean;
    serviceUser = new User(null, '', '', '', '', '', Role.User);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {service: Service}) => {
                this.service = data.service;
                console.log(this.service);
                let currentUser = this.sessionService.getCurrentUser();
                this.isMyService = (this.service.userId === currentUser.id);

                if (!this.isMyService) {
                    this.userService.getUser(this.service.userId).subscribe(
                        (data: User) => {
                            this.serviceUser = data;
                        }
                    );
                }
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }

}
