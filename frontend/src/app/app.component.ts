import {HttpClient} from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Profile',
      url: '/profile',
    },
    {
      title: 'Settings',
      url: '/settings',
    },
    {
      title: 'Login',
      url: '/login',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }
}
