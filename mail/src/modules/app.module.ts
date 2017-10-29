import { Module } from "@nestjs/common";
import { TemplatesModule } from "./database/templates/templates.module";

@Module({
    modules: [
        TemplatesModule
    ]
})
export class ApplicationModule {
}
