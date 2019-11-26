import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ServicePage } from './service.page';
import { ServiceResolver } from '../_services/service-resolver.service';

const serviceRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'service/:id',
    component: ServicePage,
    resolve: {
        service: ServiceResolver
    }
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    serviceRouting
  ],
  declarations: [ServicePage],
  providers: [ServiceResolver]
})
export class ServicePageModule {}
