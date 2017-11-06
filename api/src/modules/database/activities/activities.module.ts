import { Module } from "@nestjs/common";
import { ActivitiesController } from "./activities.controller";
import { ActivitiesService } from "./activities.service";
import { activitiesProviders } from "./activities.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [DatabaseModule],
    controllers: [ActivitiesController],
    components: [
        ActivitiesService,
        ...activitiesProviders
    ]
})
export class ActivitiesModule {
}
