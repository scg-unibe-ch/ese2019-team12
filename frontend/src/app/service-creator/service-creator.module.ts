import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiceCreatorPage} from './service-creator.page'

const routes: Routes = [
  {
    path: '',
    component: ServiceCreatorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    ],
  declarations: [ServiceCreatorPage]
})
export class ServiceCreatorPageModule { }
