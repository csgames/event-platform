import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth0Module } from "../../auth0/auth0.module";
import { ConfigModule } from "../../configs/config.module";
import { EmailModule } from "../../email/email.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { EventsModule } from "../events/events.module";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsSchema } from "./registrations.model";
import { RegistrationsService } from "./registrations.service";
import { TeamsModule } from "../teams/teams.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "registrations",
            schema: RegistrationsSchema
        }]),
        Auth0Module,
        AttendeesModule,
        EventsModule,
        EmailModule,
        ConfigModule,
        TeamsModule
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
