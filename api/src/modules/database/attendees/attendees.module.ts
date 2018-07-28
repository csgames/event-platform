import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StorageModule, STSModule } from "@polyhx/nest-services";
import { SchoolsModule } from "../schools/schools.module";
import { AttendeesController } from "./attendees.controller";
import { AttendeesSchema } from "./attendees.model";
import { AttendeesService } from "./attendees.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "attendees",
            schema: AttendeesSchema
        }]),
        SchoolsModule,
        StorageModule,
        STSModule
    ],
    controllers: [
        AttendeesController
    ],
    providers: [
        AttendeesService
    ],
    exports: [
        AttendeesService
    ]
})
export class AttendeesModule { }
