import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsController } from "./events.controller";
import { EventsSchema } from "./events.model";
import { EventsService } from "./events.service";
import { AttendeesModule } from "../attendees/attendees.module";
import { STSModule } from "@polyhx/nest-services";
import { EmailModule } from "../../email/email.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "events",
            schema: EventsSchema
        }]),
        AttendeesModule,
        EmailModule,
        STSModule
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
