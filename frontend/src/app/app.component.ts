import { HttpClient } from '@angular/common/http';

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
            icon: 'planet',
            url: '/explore',
        },
        {
            title: 'Login or Register',
            icon: 'log-in',
            url: '/login',
        }
    ];
    public userPages = [
        {
            title: 'Explore',
            icon: 'planet',
            url: '/explore',
        },
        {
            title: 'Profile',
            icon: 'contact',
            url: '/profile/me',
        },
        {
            title: 'Add Service',
            icon: 'add-circle-outline',
            url: '/service-creator',
        },
        {
            title: 'Add Event',
            icon: 'add-circle-outline',
            url: '/event-creator',
        },
        {
            title: 'Log Out',
            icon: 'power',
            url: '/logout',
        }
    ];
    public adminPages = [
        {
            title: 'Admin',
            icon: 'code-working',
            url: '/admin'
        },
        {
            title: 'Explore',
            icon: 'planet',
            url: '/explore',
        },
        {
            title: 'Profile',
            icon: 'contact',
            url: '/profile/me',
        },
        {
            title: 'Add Service',
            icon: 'add-circle-outline',
            url: '/service-creator',
        },
        {
            title: 'Log Out',
            icon: 'power',
            url: '/logout',
        }
    ];

    public role: string;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
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
