import { Module } from "@nestjs/common";
import { EmailModule } from "../database/email/email.module";
import { WebHookController } from "./webhook.controller";
import { STSModule } from "@polyhx/nest-services";
import { WebHookService } from "./webhook.service";

@Module({
    imports: [
        EmailModule,
        STSModule
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
