import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AttendeesModule } from "../attendees/attendees.module";
import { NotificationsController } from "./notifications.controller";
import { NotificationsSchema } from "./notifications.model";
import { NotificationsService } from "./notifications.service";
import { MessagingModule } from '../../messaging/messaging.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "notifications",
            schema: NotificationsSchema
        }]),
        AttendeesModule,
        MessagingModule
    ],
    controllers: [
        NotificationsController
    ],
    providers: [
        NotificationsService,
    ],
    exports: [
        NotificationsService
    ]
})
export class NotificationsModule {
}
