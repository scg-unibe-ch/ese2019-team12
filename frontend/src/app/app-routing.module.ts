import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './start/start.module#StartPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
