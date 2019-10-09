import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUp implements OnInit {

  constructor() { }

  ngOnInit() {}

  user = {}



// Processes the given Inputs to be stored in the Back-End. Also gives a quick welcome-message
  processForm(event) {
      // event.preventDefault();
      console.log(this.user)
      // this.user.firstName = new FormControl('text')
      alert('Thank you '+this.user.firstName+' '+this.user.lastName+' for signing up on \"ExWi-Tinder\"')
  }
}
