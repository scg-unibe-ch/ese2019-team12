import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {path: 'userpage', component: UserpageComponent},
=======
const routes: Routes = [
  { path: '', loadChildren: './start/start.module#StartPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }

>>>>>>> 3d5f8f133a08d6eb83fcf08bf619d1c7c9b224dd
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
