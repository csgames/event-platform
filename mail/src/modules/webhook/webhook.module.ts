import { Module } from "@nestjs/common";
import { EmailModule } from "../database/email/email.module";
import { WebHookController } from "./webhook.controller";
import { STSModule } from "@polyhx/nest-services";
import { WebHookService } from "./webhook.service";

@Module({
    modules: [ EmailModule, STSModule ],
    components: [ WebHookService ],
    controllers: [ WebHookController ]
})
export class WebHookModule {
}
