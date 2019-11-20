import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ],
  declarations: [ServiceCreatorPage]
})
export class ServiceCreatorPageModule { }
