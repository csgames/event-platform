import { Module } from "@nestjs/common";
import { AttendeesController } from "./attendees.controller";
import { AttendeesService } from "./attendees.service";
import { attendeesProviders } from "./attendees.providers";
import { DatabaseModule } from "../database.module";
import { SchoolsModule } from "../schools/schools.module";

@Module({
    modules: [ DatabaseModule, SchoolsModule ],
    controllers: [ AttendeesController ],
    components: [
        AttendeesService,
        ...attendeesProviders
    ],
    exports: [ AttendeesService ]
})
export class AttendeesModule { }
