import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ProfilePageModule } from './profile/profile.module';
import { ServicePageModule } from './service/service.module';
import { EventPageModule } from './event/event.module';
import { EventCreatorPageModule } from './event-creator/event-creator.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
        canActivate: [RoleGuard],
        data: {role: 'Admin'},
    },
    {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    },
    {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule),
    },
    {
        path: 'registration',
        loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule),
    },
    {
        path: 'service-creator',
        loadChildren: () => import('./service-creator/service-creator.module').then(m => m.ServiceCreatorPageModule),
        canActivate: [AuthGuard],
    }
    // {
    //     path: 'event-creator',
    //     loadChildren: () => import('./event-creator/event-creator.module').then(m => m.EventCreatorPageModule),
    //     canActivate: [AuthGuard],
    // }
];
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), ProfilePageModule, ServicePageModule, EventPageModule, EventCreatorPageModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
