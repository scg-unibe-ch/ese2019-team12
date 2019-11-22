import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../_services/session.service';
import { Service } from '../_models/service';
import { Role } from '../_models/role';

@Component({
    selector: 'app-service-creator',
    templateUrl: './service-creator.page.html',
    styleUrls: ['./service-creator.page.scss'],
})
export class ServiceCreatorPage implements OnInit {
    service = new Service(null, '', '', '', null, []);
    chips = [];

    serviceForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(1)]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        tagInput: new FormControl(''),
    });

    constructor(private sessionService: SessionService) { }

    ngOnInit() {}

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
        this.service.user = this.sessionService.getCurrentUser().username;
        console.log(this.service);
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
