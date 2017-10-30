import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";

@Module({
    controllers: [ EmailController ],
    components: [ EmailService ]
})
export class EmailModule {
}
