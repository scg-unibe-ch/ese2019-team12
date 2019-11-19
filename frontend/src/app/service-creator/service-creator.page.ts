import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {IonSlides} from '@ionic/angular';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';



@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.page.html',
  styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {
    serviceForm1: FormGroup;
    serviceForm2: FormGroup;
    serviceForm3: FormGroup;
    user = new User(null, '', '', '', '', '', Role.User);

    @ViewChild('slides') slides: Slides;


  constructor(private userService: UserService) { }


  ngOnInit() {
      this.serviceForm1 = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
          serviceDescription: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
      });
      this.serviceForm2 = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
          serviceDescription: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
      });
      this.serviceForm3 = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
          serviceDescription: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1)]),
      });
  }
  nextSlide(){
       this.slides.slideNext();
  }
  prevSlide() {
         this.slides.slidePrev();
     }
processForm(){
    console.log(this.service.name)
}

}
