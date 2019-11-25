import { Component, OnInit, Input } from '@angular/core';
import { Service } from "../../_models/service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})

export class ServiceCardComponent implements OnInit {
  @Input() service: Service;
  username: String;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
      this.userService.getUser(this.service.userId).subscribe(data => {
          this.username = data.username;
      });
  }

}
