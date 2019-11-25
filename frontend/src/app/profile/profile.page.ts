import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    profile: User;
    isUser: boolean;

    constructor(
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            (data: {profile: User}) => {
                this.profile = data.profile;
                console.log(this.profile);
            },
            (err) => {
                this.router.navigate(['/explore']);
            }
        );
    }
}
