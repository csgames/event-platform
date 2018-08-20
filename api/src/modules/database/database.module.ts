import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActivitiesModule } from "./activities/activities.module";
import { AttendeesModule } from "./attendees/attendees.module";
import { EventsModule } from "./events/events.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { SchoolsModule } from "./schools/schools.module";
import { TeamsModule } from "./teams/teams.module";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD +
            "@" + process.env.DB_ADDRESS, {
            useMongoClient: true
        }),
        ActivitiesModule,
        AttendeesModule,
        EventsModule,
        NotificationsModule,
        SchoolsModule,
        TeamsModule
    ]
})
export class DatabaseModule {
}
