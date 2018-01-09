import { Module } from "@nestjs/common";
import { EmailModule } from "./email/email.module";
import { TemplatesModule } from "./templates/templates.module";

@Module({
    modules: [
        EmailModule,
        TemplatesModule
    ]
})
export class DatabaseModule {
}
