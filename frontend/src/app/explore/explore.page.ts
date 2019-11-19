import { Component, OnInit } from '@angular/core';
import {Service} from "../_models/service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  // Placeholder for services that will be read from the database
  services = [
    {
      service1 : new Service(1, 1, 'john\'s failing business', 'Catering', 'yes this was very good idea'),
      service2 : new Service(2, 2, 'jane\'s trashy food', 'Catering', 'bad decisions only'),
      service3 : new Service(3, 3, 'jim\'s clean up crew', 'Cleaning', 'please don\'t be gross at your party'),
      service4 : new Service(4, 1, 'john\'s security crew', 'Security', 'we\'re already scared')
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
