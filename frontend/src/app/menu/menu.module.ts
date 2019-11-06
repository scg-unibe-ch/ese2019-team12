import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'explore',
        loadChildren: '../explore/explore.module#ExplorePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginPageModule'
      },
      {
        path: 'registration',
        loadChildren: '../registration/registration.module#RegistrationPageModule'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/explore',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
