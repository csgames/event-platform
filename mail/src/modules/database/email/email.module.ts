import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth0Module } from "../../auth0/auth0.module";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { TemplatesModule } from "../templates/templates.module";
import { EmailSchema } from "./email.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Mail", schema: EmailSchema }]),
        TemplatesModule,
        Auth0Module
    ],
    controllers: [
        EmailController
    ],
    providers: [
        EmailService
    ],
    exports: [
        EmailService
    ]
})
export class EmailModule {
}
