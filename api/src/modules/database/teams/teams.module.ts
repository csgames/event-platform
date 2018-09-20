import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeesModule } from '../attendees/attendees.module';
import { EventsModule } from '../events/events.module';
import { TeamsController } from './teams.controller';
import { TeamsSchema } from './teams.model';
import { TeamsService } from './teams.service';
import { LHGamesModule } from '../../lhgames/lhgames.module';
import { STSModule } from '@polyhx/nest-services';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'teams',
            schema: TeamsSchema
        }]),
        EventsModule,
        AttendeesModule,
        STSModule,
        LHGamesModule
    ],
    controllers: [
        TeamsController
    ],
    providers: [
        TeamsService
    ],
    exports: [
        TeamsService
    ]
})
export class TeamsModule {
}
