import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StorageModule, STSModule } from "@polyhx/nest-services";
import { AttendeesController } from "./attendees.controller";
import { AttendeesSchema } from "./attendees.model";
import { AttendeesService } from "./attendees.service";
import { EventsSchema } from '../events/events.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "attendees",
            schema: AttendeesSchema
        }]),
        MongooseModule.forFeature([{
            name: 'events',
            schema: EventsSchema
        }]),
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
