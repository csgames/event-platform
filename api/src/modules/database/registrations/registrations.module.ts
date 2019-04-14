import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { STSModule } from "@polyhx/nest-services";
import { ConfigModule } from "../../configs/config.module";
import { EmailModule } from "../../email/email.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { EventsModule } from "../events/events.module";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsSchema } from "./registrations.model";
import { RegistrationsService } from "./registrations.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "registrations",
            schema: RegistrationsSchema
        }]),
        STSModule,
        AttendeesModule,
        EventsModule,
        EmailModule,
        ConfigModule
    ],
    controllers: [
        RegistrationsController
    ],
    providers: [
        RegistrationsService
    ],
    exports: [
        RegistrationsService
    ]
})
export class RegistrationsModule {
}
