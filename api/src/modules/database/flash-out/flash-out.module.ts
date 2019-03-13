import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FlashOutSchema } from "./flash-out.model";
import { FlashOutController } from "./flash-out.controller";
import { FlashOutsService } from "./flash-out.service";
import { AttendeesModule } from "../attendees/attendees.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "flash-outs",
            schema: FlashOutSchema
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
export class FlashOutsModule { }
