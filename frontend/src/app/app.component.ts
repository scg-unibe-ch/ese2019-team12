import {HttpClient} from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './_services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  public publicPages = [
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Login',
      url: '/login',
    }
  ];
  public userPages = [
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Profile',
      url: '/profile',
    },
    {
      title: 'Add Service',
      url: '/service-creator',
    }
  ];
  public adminPages = [
    {
      title: 'Admin',
      url: '/admin'
    },
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Profile',
      url: '/profile',
    },
    {
      title: 'Add Service',
      url: '/service-creator',
    }
  ];

  public role: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient,
    private session: SessionService,
  ) {
    this.initializeApp();
    this.role = session.getCurrentRole();
    this.session.currentRole.subscribe(role => this.changeRole(role));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }
  
  changeRole(role: string): void {
    this.role = role;
  }
}
