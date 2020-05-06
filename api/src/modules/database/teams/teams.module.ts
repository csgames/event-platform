import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailModule } from "../../email/email.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { EventsSchema } from "../events/events.model";
import { EventsModule } from "../events/events.module";
import { SchoolsModule } from "../schools/schools.module";
import { TeamsController } from "./teams.controller";
import { TeamsSchema } from "./teams.model";
import { TeamsService } from "./teams.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "teams",
            schema: TeamsSchema
        }]),
        MongooseModule.forFeature([{
            name: "events",
            schema: EventsSchema
        }]),
        forwardRef(() => EventsModule),
        AttendeesModule,
        EmailModule,
        SchoolsModule
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
