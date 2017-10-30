import { Module } from "@nestjs/common";
import { TemplatesModule } from "./database/templates/templates.module";
import { EmailModule } from "./email/email.module";

@Module({
    modules: [
        EmailModule,
        TemplatesModule
    ]
})
export class ApplicationModule {
}
