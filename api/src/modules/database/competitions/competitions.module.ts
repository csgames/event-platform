import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeesSchema } from '../attendees/attendees.model';
import { EventsModule } from '../events/events.module';
import { RegistrationsModule } from '../registrations/registrations.module';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsSchema } from './competitions.model';
import { CompetitionsService } from './competitions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'competitions',
            schema: CompetitionsSchema
        }]),
        MongooseModule.forFeature([{
            name: 'attendees',
            schema: AttendeesSchema
        }]),
        EventsModule,
        RegistrationsModule
    ],
    controllers: [CompetitionsController],
    providers: [
        CompetitionsService
    ],
    exports: [
        CompetitionsService
    ]
})
export class CompetitionsModule {
}
