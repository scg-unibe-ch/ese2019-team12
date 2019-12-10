import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {


  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
      this.sessionService.logout();
      this.router.navigate(['/explore']);
  }

}
