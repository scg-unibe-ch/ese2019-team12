import { Component, OnInit } from '@angular/core';
import {Service} from "../../_models/service";

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})

export class ServiceCardComponent implements OnInit {

  service = new Service(1, 1, 'john\'s failing business', 'Catering', 'yes this was a very good idea');
  constructor() { }

  ngOnInit() {}

}
