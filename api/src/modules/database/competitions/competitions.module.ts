import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActivitiesModule } from "../activities/activities.module";
import { AttendeesSchema } from "../attendees/attendees.model";
import { EventsModule } from "../events/events.module";
import { QuestionsSchema } from "../questions/questions.model";
import { QuestionsModule } from "../questions/questions.module";
import { RegistrationsModule } from "../registrations/registrations.module";
import { TeamsSchema } from "../teams/teams.model";
import { CompetitionsController } from "./competitions.controller";
import { CompetitionsGateway } from "./competitions.gateway";
import { CompetitionsSchema } from "./competitions.model";
import { CompetitionsService } from "./competitions.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "competitions",
            schema: CompetitionsSchema
        }]),
        MongooseModule.forFeature([{
            name: "attendees",
            schema: AttendeesSchema
        }]),
        MongooseModule.forFeature([{
            name: "teams",
            schema: TeamsSchema
        }]),
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }]),
        EventsModule,
        RegistrationsModule,
        ActivitiesModule,
        QuestionsModule
    ],
    controllers: [CompetitionsController],
    providers: [
        CompetitionsService,
        CompetitionsGateway
    ],
    exports: [
        CompetitionsService
    ]
})
export class CompetitionsModule {
}
