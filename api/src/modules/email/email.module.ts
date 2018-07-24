import { Module } from "@nestjs/common";
import { STSModule } from "@polyhx/nest-services";
import { EmailService } from "./email.service";

@Module({
    imports: [
        STSModule
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
