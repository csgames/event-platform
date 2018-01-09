import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { eventsProviders } from "./events.providers";
import { DatabaseModule } from "../database.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { STSModule } from "@polyhx/nest-services";
import { EmailModule } from "../../email/email.module";

@Module({
    modules: [AttendeesModule, DatabaseModule, EmailModule, STSModule],
    controllers: [EventsController],
    components: [
        EventsService,
        ...eventsProviders
    ],
    exports: [ EventsService ]
})
export class EventsModule {
}
