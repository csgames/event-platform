import { Module } from "@nestjs/common";
import { NotificationsController } from "./notifications.controller";
import { NotificationsProviders } from "./notifications.providers";
import { NotificationsService } from "./notifications.service";
import { DatabaseModule } from "../database.module";
import { AttendeesModule } from "../attendees/attendees.module";
import { NotificationGateway } from "./notifications.gateway";

@Module({
    modules: [AttendeesModule, DatabaseModule],
    controllers: [NotificationsController],
    components: [
        NotificationsService,
        NotificationGateway,
        ...NotificationsProviders
    ]
})
export class NotificationsModule {
}
