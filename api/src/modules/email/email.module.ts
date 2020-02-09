import { HttpModule, Module } from "@nestjs/common";
import { STSModule } from "@polyhx/nest-services";
import { EmailTemplateService } from "./email-template.service";
import { EmailService } from "./email.service";

@Module({
    imports: [
        STSModule,
        HttpModule
    ],
    providers: [
        EmailService,
        EmailTemplateService
    ],
    exports: [
        EmailService,
        EmailTemplateService
    ]
})
export class EmailModule {
}
