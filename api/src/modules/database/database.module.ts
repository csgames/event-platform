import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../configs/config.module';
import { MongooseConfigService } from '../configs/mongo-config.service';
import { ActivitiesModule } from './activities/activities.module';
import { AttendeesModule } from './attendees/attendees.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { EventsModule } from './events/events.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SchoolsModule } from './schools/schools.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { TeamsModule } from './teams/teams.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { PuzzleHeroesModule } from './puzzle-heroes/puzzle-heroes.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: MongooseConfigService
        }),
        ActivitiesModule,
        AttendeesModule,
        EventsModule,
        NotificationsModule,
        RegistrationsModule,
        SchoolsModule,
        SponsorsModule,
        TeamsModule,
        PuzzleHeroesModule,
        CompetitionsModule
    ]
})
export class DatabaseModule {
}
