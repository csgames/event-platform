import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsSchema } from '../questions/questions.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'questions',
            schema: QuestionsSchema
        }])
    ],
    controllers: [],
    providers: [
    ],
    exports: [
    ]
})
export class CompetitionsModule {
}
