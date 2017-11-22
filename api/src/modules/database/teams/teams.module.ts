import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller";
import { teamsProviders } from "./teams.providers";
import { TeamsService } from "./teams.service";
import { AttendeesModule } from "../attendees/attendees.module";
import { DatabaseModule } from "../database.module";
import { STSModule } from "../../sts/sts.module";

@Module({
    modules: [AttendeesModule, DatabaseModule, STSModule],
    controllers: [TeamsController],
    components: [
        TeamsService,
        ...teamsProviders
    ]
})
export class TeamsModule {
}
