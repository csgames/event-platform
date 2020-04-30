import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth0Module } from "../../auth0/auth0.module";
import { ConfigModule } from "../../configs/config.module";
import { EmailModule } from "../../email/email.module";
import { PasswordResetsController } from "./password-resets.controller";
import { PasswordResetsSchema } from "./password-resets.model";
import { PasswordResetsService } from "./password-resets.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "password-resets",
            schema: PasswordResetsSchema
        }]),
        Auth0Module,
        ConfigModule,
        EmailModule
    ],
    controllers: [
        PasswordResetsController
    ],
    providers: [
        PasswordResetsService
    ],
    exports: [
        PasswordResetsService
    ]
})
export class PasswordResetsModule {
}
