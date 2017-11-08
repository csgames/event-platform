import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";
import { teamsProviders } from "./teams.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [DatabaseModule],
    controllers: [TeamsController],
    components: [
        TeamsService,
        ...teamsProviders
    ]
})
export class TeamsModule {
}
