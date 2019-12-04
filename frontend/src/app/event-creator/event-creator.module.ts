import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventCreatorPage } from './event-creator.page';
import { EventCreatorResolver } from '../_services/event-creator-resolver.service';

const eventCreatorRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'event-creator',
        component: EventCreatorPage
    },
    {
        path: 'event-creator/:id',
        component: EventCreatorPage,
        resolve: {
            service: EventCreatorResolver
        }
        // add AuthGuard if it works
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
