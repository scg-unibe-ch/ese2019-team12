import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServiceService } from '../../_services/service.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})

export class ServiceCardComponent implements OnInit {
  @Input() service;
  @Output() event: EventEmitter<string> = new EventEmitter();
  serviceImage: SafeUrl;
  serviceHasImage: boolean;

  constructor(
      private serviceService: ServiceService,
      private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
      /**
       * fetches the image attached to the loaded service, if any.
       */
      this.serviceService.downloadImage(this.service.id).subscribe(
          data => {
              this.serviceHasImage = (data.size > 0);
              const objectURL = URL.createObjectURL(data);
              this.serviceImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
      );
  }

  /**
   * Emitter to call on parent createChip function.
   * (See explore.page.ts)
   * @param  chip the chip to add to the filter.
   */
  createChip(chip) {
      this.event.emit(chip);
  }

}
