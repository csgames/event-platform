import { Module } from "@nestjs/common";
import { AttendeesModule } from "./database/attendees/attendees.module";
import { EventsModule } from "./database/events/events.module";
import { RegistrationModule } from "./registration/registration.module";
import { SchoolsModule } from "./database/schools/schools.module";
import { TeamsModule } from "./database/teams/teams.module";

@Module({
    modules: [
        AttendeesModule,
        EventsModule,
        RegistrationModule,
        SchoolsModule,
        TeamsModule
    ]
})
export class ApplicationModule { }
