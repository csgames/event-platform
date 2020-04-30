import { HttpModule, Module } from "@nestjs/common";
import { Auth0Module } from "../auth0/auth0.module";
import { EmailTemplateService } from "./email-template.service";
import { EmailService } from "./email.service";

@Module({
    imports: [
        Auth0Module,
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
