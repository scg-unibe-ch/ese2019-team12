import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';


@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.page.html',
  styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
