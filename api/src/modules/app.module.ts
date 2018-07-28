import { Module } from "@nestjs/common";
import { MailGateway } from "../gateways/mail.gateway";
import { DatabaseModule } from "./database/database.module";
import { RegistrationModule } from "./registration/registration.module";

@Module({
    imports: [
        DatabaseModule,
        RegistrationModule,
    ],
    providers: [
        MailGateway
    ],
    exports: [
        MailGateway
    ]
})
export class ApplicationModule { }
