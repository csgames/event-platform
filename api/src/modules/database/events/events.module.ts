import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { eventsProviders } from "./events.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [DatabaseModule],
    controllers: [EventsController],
    components: [
        EventsService,
        ...eventsProviders
    ]
})
export class EventsModule {
}
