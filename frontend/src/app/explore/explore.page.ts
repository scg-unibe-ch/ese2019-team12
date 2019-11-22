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
      new Service(1, 'john_1', 'john\'s failing business', 'Catering', 1000, ['yum', 'food']),
      new Service(2, 'janette69', 'jane\'s trashy food', 'Catering', 200, ['sexy', 'trashy']),
      new Service(3, 'JimmyJim', 'jim\'s clean up crew', 'Cleaning', 300, ['clean', 'murder']),
      new Service(4, 'john_1', 'john\'s security crew', 'Security', 5, ['safe AF'])
  ];

  constructor() {}

  ngOnInit() {}

}
