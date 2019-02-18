import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PuzzleHeroesSchema } from './puzzle-heroes.model';
import { PuzzleHeroesService } from './puzzle-heroes.service';
import { PuzzleHeroesController } from './puzzle-heroes.controller';
import { QuestionsSchema } from '../questions/questions.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "puzzle-heroes",
            schema: PuzzleHeroesSchema
        }]),
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }])
    ],
    controllers: [PuzzleHeroesController],
    providers: [
        PuzzleHeroesService
    ],
    exports: [
        PuzzleHeroesService
    ]
})
export class PuzzleHeroesModule {
}
