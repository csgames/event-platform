import { Module } from "@nestjs/common";
import { ConfigModule } from "../configs/config.module";
import { MessagingService } from "./messaging.service";

@Module({
    imports: [ConfigModule],
    providers: [MessagingService],
    exports: [MessagingService]
})
export class MessagingModule {
}
