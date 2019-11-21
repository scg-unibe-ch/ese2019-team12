import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Service } from '../_models/service';
import { Role } from '../_models/role';

@Component({
    selector: 'app-service-creator',
    templateUrl: './service-creator.page.html',
    styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {
    service = new Service(null, '', '',null,'');
    chips = [];

    serviceForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(1)]),
        serviceDescription: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        tagInput: new FormControl(''),
    });

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    tagsParser() {
        let input = this.serviceForm.get('tagInput').value;
        if (input.slice(-1) === ",") {
            this.createChip(input.slice(0, -1));
            this.serviceForm.get('tagInput').setValue("");
        }
    }

    createService() {
        alert(this.service.title + " was created.");
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
