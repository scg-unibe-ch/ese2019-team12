import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
