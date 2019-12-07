import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../_services/service.service';
import { Service } from '../../_models/service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})

export class ServiceCardComponent implements OnInit {
  @Input() serviceCard;
  serviceImage: SafeUrl;
  serviceHasImage: boolean;

  constructor(
      private serviceService: ServiceService,
      private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
      this.serviceService.downloadImage(this.serviceCard.service.id).subscribe(
          data => {
              this.serviceHasImage = (data.size > 0);
              let objectURL = URL.createObjectURL(data);
              this.serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
      )
  }

}
