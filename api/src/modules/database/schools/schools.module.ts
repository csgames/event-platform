import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SchoolsController } from "./schools.controller";
import { SchoolsSchema } from "./schools.model";
import { SchoolsService } from "./schools.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "schools",
            schema: SchoolsSchema
        }])
    ],
    controllers: [
        SchoolsController
    ],
    providers: [
        SchoolsService
    ],
    exports: [
        SchoolsService
    ]
})
export class SchoolsModule { }
