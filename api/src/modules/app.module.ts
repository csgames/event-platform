import { Module } from "@nestjs/common";
import { AttendeesModule } from "./database/attendees/attendees.module";
import { EventsModule } from "./database/events/events.module";
import { RegistrationModule } from "./registration/registration.module";
import { SchoolsModule } from "./database/schools/schools.module";
import { TeamsModule } from "./database/teams/teams.module";
import { MailGateway } from "../gateways/mail.gateway";
import { ActivitiesModule } from "./database/activities/activities.module";
import { NotificationsModule } from "./database/notifications/notifications.module";

@Module({
    imports: [
        ActivitiesModule,
        AttendeesModule,
        EventsModule,
        NotificationsModule,
        RegistrationModule,
        SchoolsModule,
        TeamsModule
    ],
    providers: [
        MailGateway
    ],
    exports: [
        MailGateway
    ]
})
export class ApplicationModule { }
