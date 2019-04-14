import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SponsorsController } from "./sponsors.controller";
import { SponsorsSchema } from "./sponsors.model";
import { SponsorsService } from "./sponsors.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "sponsors",
            schema: SponsorsSchema
        }])
    ],
    controllers: [
        SponsorsController
    ],
    providers: [
        SponsorsService
    ],
    exports: [
        SponsorsService
    ]
})
export class SponsorsModule {
}
