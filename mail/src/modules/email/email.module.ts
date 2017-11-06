import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { TemplatesModule } from "../database/templates/templates.module";

@Module({
    modules: [ TemplatesModule ],
    controllers: [ EmailController ],
    components: [ EmailService ]
})
export class EmailModule {
}
