import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material';


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
    MatStepperModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule
    ],
  declarations: [ServiceCreatorPage]
})
export class ServiceCreatorPageModule { }
