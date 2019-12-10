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

    /**
     * currentUser: User, the current logged-in user.
     * serviceForm: FormGroup, the form to create a new service.
     * image: File, the image to be uploaded, if provided.
     * hasImage: boolean, true if an image is provided.
     * chips: [], an array of strings with the parsed tags.
     */
    currentUser: User;
    serviceForm: FormGroup;
    service = new Service(null, null, '', '', '', '', null, []);
    image: File;
    hasImage: boolean = false;
    chips = [];

    constructor(
        private sessionService: SessionService,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit() {

        this.currentUser = this.sessionService.getCurrentUser();

        this.serviceForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            price: new FormControl('', [Validators.required]),
            tagInput: new FormControl(''),
            file: new FormControl('')
        });
    }

    /**
     * parses tags from the tagInput FormControl.
     */
    tagsParser() {
        const input = this.serviceForm.get('tagInput').value;
        if (input.slice(-1) === ',') {
            this.createChip(input.slice(0, -1));
            this.serviceForm.get('tagInput').setValue('');
        }
    }

    /**
     * Creates a new service with the inputted data.
     */
    createService() {
        this.service.title = this.serviceForm.get('title').value;
        this.service.description = this.serviceForm.get('description').value;
        this.service.price = this.serviceForm.get('price').value;
        this.service.tags = this.chips;
        this.service.userId = this.sessionService.getCurrentUser().id;
        this.serviceForm.reset();

        this.serviceService.create(this.service).subscribe(
            (data: Service) => {
                // uploads image if provided
                if (this.hasImage) {
                    this.serviceService.uploadImage(data.id, this.image).subscribe(
                        (data) => {
                            this.router.navigate(['/profile/me']);
                        }
                    );
                }
            },
            (err: any) => {
                console.log('error message: ' + err.message);
            }
        );
    }

    processImage(event) {
        this.hasImage = true;
        this.image = (event.target as HTMLInputElement).files[0];
    }

    /**
     * Creates a chip to be displayed.
     * @param  chipToAdd the chip to add.
     */
    createChip(chipToAdd) {
        if (!this.chips.includes(chipToAdd)) {
            this.chips.push(chipToAdd);
        }
    }

    /**
     * Deletes a chip.
     * @param  chipToDelete the chip to delete.
     */
    deleteChip(chipToDelete) {
        this.chips = this.chips.filter(chip => {
            return chip !== chipToDelete;
        });
    }
}
