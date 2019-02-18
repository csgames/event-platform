import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionsSchema } from './questions.model';
import { QuestionsService } from './questions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }])
    ],
    providers: [
    ],
    exports: [
        QuestionsService
    ]
})
export class QuestionsModule { }
