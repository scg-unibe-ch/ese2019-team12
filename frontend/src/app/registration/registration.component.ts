import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class Registration implements OnInit {

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
