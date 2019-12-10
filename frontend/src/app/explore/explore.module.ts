import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxMasonryModule } from 'ngx-masonry';
import { ExplorePage } from './explore.page';
import { ServiceCardComponent} from '../_components/service-card/service-card.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMasonryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExplorePage, ServiceCardComponent]
})
export class ExplorePageModule {}
