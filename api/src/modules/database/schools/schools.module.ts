import { Module } from "@nestjs/common";
import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";
import { schoolsProviders } from "./schools.providers";
import { DatabaseModule } from "../database.module";

@Module({
    modules: [ DatabaseModule ],
    controllers: [ SchoolsController ],
    components: [
        SchoolsService,
        ...schoolsProviders
    ],
    exports: [ SchoolsService ]
})
export class SchoolsModule { }
