import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxMasonryModule } from 'ngx-masonry';
import { ProfilePage } from './profile.page';
import { ProfileResolver } from '../_services/profile-resolver.service';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'profile/:id',
        component: ProfilePage,
        resolve: {
            profile: ProfileResolver
        }
    }
]);

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxMasonryModule,
        profileRouting
    ],
    declarations: [ProfilePage],
    providers: [ProfileResolver]
})
export class ProfilePageModule {}
