import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthGuard } from '../auth/auth.guard';

import { EventCreatorPage } from './event-creator.page';
import { EventCreatorResolver } from '../_services/event-creator-resolver.service';

const eventCreatorRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'event-creator',
        component: EventCreatorPage,
        canActivate: [AuthGuard]
    },
    {
        path: 'event-creator/:id',
        component: EventCreatorPage,
        canActivate: [AuthGuard],
        resolve: {
            serviceId: EventCreatorResolver
        }
    }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    eventCreatorRouting
  ],
  declarations: [EventCreatorPage],
  providers: [EventCreatorResolver]
})
export class EventCreatorPageModule {}
