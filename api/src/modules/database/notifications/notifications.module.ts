import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendeesModule } from "../attendees/attendees.module";
import { NotificationsController } from "./notifications.controller";
import { NotificationGateway } from "./notifications.gateway";
import { NotificationsSchema } from "./notifications.model";
import { NotificationsService } from "./notifications.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "notifications",
            schema: NotificationsSchema
        }]),
        AttendeesModule
    ],
    controllers: [
        NotificationsController
    ],
    providers: [
        NotificationsService,
        NotificationGateway
    ],
    exports: [
        NotificationsService
    ]
})
export class NotificationsModule {
}
