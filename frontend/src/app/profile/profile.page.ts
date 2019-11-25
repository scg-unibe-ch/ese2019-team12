import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    profile: User;
    isMe: boolean;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private sessionService: SessionService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {profile: User}) => {
                this.profile = data.profile;
                let currentUser = this.sessionService.getCurrentUser();
                this.isMe = (this.profile.id === currentUser.id);
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }
}
