import { Module } from "@nestjs/common";
import { Auth0Module } from "../../auth0/auth0.module";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TemplatesSchema } from "./templates.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Template", schema: TemplatesSchema }]),
        Auth0Module
    ],
    controllers: [
        TemplatesController
    ],
    providers: [
        TemplatesService
    ],
    exports: [
        TemplatesService
    ]
})
export class TemplatesModule {
}
