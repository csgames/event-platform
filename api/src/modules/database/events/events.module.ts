import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StorageModule, STSModule } from "@polyhx/nest-services";
import { EmailModule } from "../../email/email.module";
import { MessagingModule } from "../../messaging/messaging.module";
import { ActivitiesModule } from "../activities/activities.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { CompetitionsSchema } from "../competitions/competitions.model";
import { FlashOutsModule } from "../flash-out/flash-out.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { PuzzleHeroesModule } from "../puzzle-heroes/puzzle-heroes.module";
import { TeamsSchema } from "../teams/teams.model";
import { TeamsModule } from "../teams/teams.module";
import { EventsController } from "./events.controller";
import { EventsSchema } from "./events.model";
import { EventsService } from "./events.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "events",
            schema: EventsSchema
        }]),
        MongooseModule.forFeature([{
            name: "teams",
            schema: TeamsSchema
        }]),
        MongooseModule.forFeature([{
            name: "competitions",
            schema: CompetitionsSchema
        }]),
        ActivitiesModule,
        AttendeesModule,
        EmailModule,
        STSModule,
        forwardRef(() => TeamsModule),
        MessagingModule,
        NotificationsModule,
        FlashOutsModule,
        StorageModule,
        PuzzleHeroesModule
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
