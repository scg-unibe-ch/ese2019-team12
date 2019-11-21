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
    serviceForm: FormGroup;
    service = new Service(null, '', '',null,'');

    @ViewChild('slides', { read: true, static: false }) slides: IonSlides;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.serviceForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(1)]),
            serviceDescription: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
        });
    }

    createService(){
        alert(this.service.title+ "was created");
    }
}
