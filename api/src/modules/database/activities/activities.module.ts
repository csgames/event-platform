import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesController } from './activities.controller';
import { ActivitiesSchema } from './activities.model';
import { ActivitiesService } from './activities.service';
import { AttendeesModule } from '../attendees/attendees.module';
import { STSModule } from '@polyhx/nest-services';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventsSchema } from '../events/events.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "activities",
            schema: ActivitiesSchema
        }]),
        MongooseModule.forFeature([{
            name: 'events',
            schema: EventsSchema
        }]),
        AttendeesModule,
        STSModule,
        NotificationsModule
    ],
    controllers: [
        ActivitiesController
    ],
    providers: [
        ActivitiesService
    ],
    exports: [
        ActivitiesService
    ]
})
export class ActivitiesModule {
}
