import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendeesModule } from "../attendees/attendees.module";
import { FlashOutController } from "./flash-out.controller";
import { FlashOutSchema } from "./flash-out.model";
import { FlashOutsService } from "./flash-out.service";
import { EventsSchema } from "../events/events.model";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "flash-outs",
            schema: FlashOutSchema
        }]),
        MongooseModule.forFeature([{
            name: "events",
            schema: EventsSchema
        }]),
        AttendeesModule
    ],
    controllers: [
        FlashOutController
    ],
    providers: [
        FlashOutsService
    ],
    exports: [
        FlashOutsService
    ]
})
export class FlashOutsModule {
}
