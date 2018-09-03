import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { TemplatesModule } from "../templates/templates.module";
import { EmailSchema } from "./email.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Mail', schema: EmailSchema }]),
        TemplatesModule
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
