import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { eventsProviders } from "./events.providers";
import { DatabaseModule } from "../database.module";
import { AttendeesModule } from "../attendees/attendees.module";

@Module({
    modules: [DatabaseModule, AttendeesModule],
    controllers: [EventsController],
    components: [
        EventsService,
        ...eventsProviders
    ]
})
export class EventsModule {
}
