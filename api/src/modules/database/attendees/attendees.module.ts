import { Module } from "@nestjs/common";
import { AttendeesController } from "./attendees.controller";
import { AttendeesService } from "./attendees.service";
import { attendeesProviders } from "./attendees.providers";
import { DatabaseModule } from "../database.module";
import { SchoolsModule } from "../schools/schools.module";
import { StorageModule } from "@polyhx/nest-services";

@Module({
    modules: [ DatabaseModule, SchoolsModule, StorageModule ],
    controllers: [ AttendeesController ],
    components: [
        AttendeesService,
        ...attendeesProviders
    ],
    exports: [ AttendeesService ]
})
export class AttendeesModule { }
