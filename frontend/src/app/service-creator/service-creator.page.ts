import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.page.html',
  styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
