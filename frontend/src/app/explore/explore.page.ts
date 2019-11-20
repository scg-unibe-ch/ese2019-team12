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
      service1 : new Service(1,  'john\'s failing business', 'Catering',1000,''),
      service2 : new Service(2, 'jane\'s trashy food', 'Catering',200, 'sexy'),
      service3 : new Service(3, 'jim\'s clean up crew', 'Cleaning',300,'clean'),
      service4 : new Service(4, 'john\'s security crew', 'Security',5,'safe AF')
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
