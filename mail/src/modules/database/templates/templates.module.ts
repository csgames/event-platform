import { Module } from "@nestjs/common";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { templatesProviders } from "./templates.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [ DatabaseModule ],
    controllers: [ TemplatesController ],
    components: [
        TemplatesService,
        ...templatesProviders
    ]
})
export class TemplatesModule {
}
