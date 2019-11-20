import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'explore',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [RoleGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
   },
  {
   path: 'service-creator',
   loadChildren: () => import('./service-creator/service-creator.module').then(m => m.ServiceCreatorPageModule)
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }