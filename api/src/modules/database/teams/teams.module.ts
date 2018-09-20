import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { STSModule } from "../../sts/sts.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { EventsModule } from "../events/events.module";
import { TeamsController } from "./teams.controller";
import { TeamsSchema } from "./teams.model";
import { TeamsService } from "./teams.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "teams",
            schema: TeamsSchema
        }]),
        forwardRef(() => EventsModule),
        AttendeesModule,
        STSModule
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
