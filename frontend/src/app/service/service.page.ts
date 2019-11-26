import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { User } from '../_models/user';
import { Service } from '../_models/service';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

    service: Service;
    isMyService: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {service: Service}) => {
                this.service = data.service;
                console.log(this.service);
                let currentUser = this.sessionService.getCurrentUser();
                this.isMyService = (this.service.userId === currentUser.id);
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }

}
