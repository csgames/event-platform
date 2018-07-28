import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendeesModule } from "../attendees/attendees.module";
import { EventsSchema } from "../events/events.model";
import { NotificationsController } from "./notifications.controller";
import { NotificationGateway } from "./notifications.gateway";
import { NotificationsService } from "./notifications.service";

@Module({
    modules: [
        MongooseModule.forFeature([{
            name: "notifications",
            schema: EventsSchema
        }]),
        AttendeesModule
    ],
    controllers: [
        NotificationsController
    ],
    components: [
        NotificationsService,
        NotificationGateway
    ],
    exports: [
        NotificationsService
    ]
})
export class NotificationsModule {
}
