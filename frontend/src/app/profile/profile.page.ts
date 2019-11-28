import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { ServiceService } from '../_services/service.service';
import { User } from '../_models/user';
import { Service } from '../_models/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    profile: User;
    isMe: boolean;
    services: Service[] = [];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sessionService: SessionService,
      private serviceService: ServiceService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {profile: User}) => {
                this.profile = data.profile;
                let currentUser = this.sessionService.getCurrentUser();
                // if its you, its true :)
                this.isMe = (currentUser) ? (this.profile.id === currentUser.id) : false;

                this.serviceService.getServicesOfUser(this.profile.id).subscribe(
                    (data) => {
                        this.services = data;
                        console.log(this.services);
                    }
                )
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }
}
