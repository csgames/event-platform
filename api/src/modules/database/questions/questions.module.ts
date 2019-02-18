import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionsSchema } from './questions.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }])
    ],
    providers: [
    ]
})
export class QuestionsModule {
}
