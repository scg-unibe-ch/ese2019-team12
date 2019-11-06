import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Explore',
      url: '/explore'
    },
    {
      title: 'Profile',
      url: '/profile'
    },
    {
      title: 'Settings',
      url: '/settings'
    },
    {
      title: 'Login',
      url: '/login'
    },
  ];

  user: User = new User(0, '', '', '', '', '', Role.User);

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
