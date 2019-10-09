import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpForm implements OnInit {

  constructor() { }

  ngOnInit() {}

  user = {}

  // this.user = new FormGroup({
  //     firstName: new FormControl()
  // })


  processForm(event) {
      //event.preventDefault();
      console.log(this.user)
      alert('Thank you '+this.user.firstName+' '+this.user.lastName+' for signing up on \"ExWi-Tinder\"')
  }
}
