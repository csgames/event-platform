import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller";
import { teamsProviders } from "./teams.providers";
import { TeamsService } from "./teams.service";
import { AttendeesModule } from "../attendees/attendees.module";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [AttendeesModule, DatabaseModule],
    controllers: [TeamsController],
    components: [
        TeamsService,
        ...teamsProviders
    ]
})
export class TeamsModule {
}
