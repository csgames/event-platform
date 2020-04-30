import { Module } from "@nestjs/common";
import { EmailModule } from "../database/email/email.module";
import { WebHookController } from "./webhook.controller";
import { WebHookService } from "./webhook.service";

@Module({
    imports: [
        EmailModule
    ],
    providers: [
        WebHookService
    ],
    controllers: [
        WebHookController
    ]
})
export class WebHookModule {
}
