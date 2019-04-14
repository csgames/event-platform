import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/common/http";
import { MongooseModule } from "@nestjs/mongoose";
import { StorageModule } from "@polyhx/nest-services";
import { QuestionsSchema } from "./questions.model";
import { QuestionsService } from "./questions.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }]),
        HttpModule,
        StorageModule
    ],
    providers: [
        QuestionsService
    ],
    exports: [
        QuestionsService
    ]
})
export class QuestionsModule {
}
