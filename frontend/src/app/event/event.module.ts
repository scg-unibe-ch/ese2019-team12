import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { EventResolver } from '../_services/event-resolver.service';

const eventRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'event/:id',
        component: EventPage,
        resolve: {
            event: EventResolver
        }
    }
]);

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        eventRouting
    ],
    declarations: [EventPage],
    providers: [EventResolver]
})
export class EventPageModule {}
