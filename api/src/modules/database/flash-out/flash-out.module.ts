import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendeesModule } from "../attendees/attendees.module";
import { FlashOutController } from "./flash-out.controller";
import { FlashOutSchema } from "./flash-out.model";
import { FlashOutsService } from "./flash-out.service";

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
export class FlashOutsModule {
}
