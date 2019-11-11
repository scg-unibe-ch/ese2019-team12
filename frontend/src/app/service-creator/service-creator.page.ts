import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonSlides} from '@ionic/angular';



@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.page.html',
  styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {
     @ViewChild('slides') slides: Slides;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  nextSlide(){
       this.slides.slideNext();
  }
  prevSlide() {
         this.slides.slidePrev();
     }

}
