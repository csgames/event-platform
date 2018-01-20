import { Module } from "@nestjs/common";
import { ActivitiesController } from "./activities.controller";
import { ActivitiesService } from "./activities.service";
import { activitiesProviders } from "./activities.providers";
import { DatabaseModule } from "../database.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { STSModule } from "@polyhx/nest-services";

@Module({
    modules: [AttendeesModule, DatabaseModule, STSModule],
    controllers: [ActivitiesController],
    components: [
        ActivitiesService,
        ...activitiesProviders
    ]
})
export class ActivitiesModule {
}
