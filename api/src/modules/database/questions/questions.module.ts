import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionsSchema } from './questions.model';
import { QuestionsService } from './questions.service';
import { StorageModule } from '@polyhx/nest-services';

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
export class QuestionsModule { }
