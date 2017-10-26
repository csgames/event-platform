import { Module } from "@nestjs/common";
import { AttendeesController } from "./attendees.controller";
import { AttendeesService } from "./attendees.service";
import { attendeesProviders } from "./attendees.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [DatabaseModule],
    controllers: [AttendeesController],
    components: [
        AttendeesService,
        ...attendeesProviders
    ]
})
export class AttendeesModule {
}
