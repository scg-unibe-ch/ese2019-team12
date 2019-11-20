import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {IonSlides} from '@ionic/angular';
import { UserService } from '../_services/user.service';
import { Service } from '../_models/service';
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
    service = new Service(null, '', '',null,'', Role.Service);

    @ViewChild('slides') slides: Slides;


  constructor(private userService: UserService) { }


  ngOnInit() {
      this.serviceForm1 = new FormGroup({
          title: new FormControl('', [Validators.required, Validators.minLength(1)]),
          serviceDescription: new FormControl('', [Validators.required]),
      });
      this.serviceForm2 = new FormGroup({
      });
      this.serviceForm3 = new FormGroup({
          price: new FormControl('', [Validators.required]),
      });
  }
      nextSlide(){
           this.slides.slideNext();
      }
      prevSlide() {
             this.slides.slidePrev();
         }
    processForm(){
        alert(this.service.title+ "was created")
    }

}
