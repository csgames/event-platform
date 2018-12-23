import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesModule } from '../activities/activities.module';
import { TeamsModule } from '../teams/teams.module';
import { EventsController } from './events.controller';
import { EventsSchema } from './events.model';
import { EventsService } from './events.service';
import { AttendeesModule } from '../attendees/attendees.module';
import { STSModule } from '@polyhx/nest-services';
import { EmailModule } from '../../email/email.module';
import { TeamsSchema } from '../teams/teams.model';
import { MessagingModule } from '../../messaging/messaging.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'events',
            schema: EventsSchema
        }]),
        MongooseModule.forFeature([{
            name: 'teams',
            schema: TeamsSchema
        }]),
        ActivitiesModule,
        AttendeesModule,
        EmailModule,
        STSModule,
        forwardRef(() => TeamsModule),
        MessagingModule
    ],
    controllers: [
        EventsController
    ],
    providers: [
        EventsService
    ],
    exports: [
        EventsService
    ]
})
export class EventsModule {
}
