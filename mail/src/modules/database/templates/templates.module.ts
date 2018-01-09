import { Module } from "@nestjs/common";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TemplatesSchema } from "./templates.model";

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Template', schema: TemplatesSchema }]) ],
    controllers: [ TemplatesController ],
    components: [ TemplatesService ],
    exports: [ TemplatesService ]
})
export class TemplatesModule {
}
