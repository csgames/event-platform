import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { JwtGuard, JwtModule } from 'nestjs-jwt2';
import { MailGateway } from "../gateways/mail.gateway";
import { DatabaseModule } from "./database/database.module";
import { RegistrationModule } from "./registration/registration.module";

@Module({
    imports: [
        DatabaseModule,
        RegistrationModule,
        JwtModule
    ],
    providers: [
        MailGateway,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
    exports: [
        MailGateway
    ]
})
export class ApplicationModule { }
