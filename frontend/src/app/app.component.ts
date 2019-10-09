import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private httpClient: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/').subscribe((instances: any) => {
    });
  }
}
