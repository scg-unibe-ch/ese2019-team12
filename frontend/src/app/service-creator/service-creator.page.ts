import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { ServiceService } from '../_services/service.service';
import { Service } from '../_models/service';
import { User } from '../_models/user';
import { Role } from '../_models/role';

@Component({
    selector: 'app-service-creator',
    templateUrl: './service-creator.page.html',
    styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {

    isLoggedIn: boolean;
    currentUser: User;
    serviceForm: FormGroup;
    service = new Service(null, null, '', '', '', null, []);
    image: File;
    chips = [];

    constructor(
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit() {
        this.isLoggedIn = this.sessionService.isLoggedIn();
        if (this.isLoggedIn) {
            this.currentUser = this.sessionService.getCurrentUser();
        }

        this.serviceForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(1)]),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            file: new FormControl(''),
            tagInput: new FormControl('')
        });
    }

    tagsParser() {
        let input = this.serviceForm.get('tagInput').value;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.serviceForm.get('tagInput').setValue("");
        }
    }

    createService() {
        this.service.title = this.serviceForm.get('title').value;
        this.service.description = this.serviceForm.get('description').value;
        this.service.price = this.serviceForm.get('price').value;
        this.service.tags = this.chips;
        this.service.userId = this.sessionService.getCurrentUser().id;
        console.log(this.image)
        this.serviceForm.reset();

        // this.serviceService.create(this.service).subscribe(
        //     (data: Service) => {
        //         console.log("created service:");
        //         console.log(data);
        //         this.serviceService.uploadImage(this.service.id, this.image).subscribe(
        //             (data) => {
        //                 console.log(data);
        //                 this.router.navigate(['/profile/me']);
        //             }
        //         )
        //     },
        //     (err: any) => {
        //         console.log('error message: ' + err.message);
        //     }
        // );
    }

    processImage(image: File) {
        console.log(image);
        //this.image = image.files[0];
    }

    createChip(chipToAdd) {
        if (!this.chips.includes(chipToAdd)) {
            this.chips.push(chipToAdd);
        }
    }

    deleteChip(chipToDelete) {
        this.chips = this.chips.filter(chip => {
            return chip != chipToDelete;
        })
    }
}
