import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PuzzleHeroesSchema } from './puzzle-heroes.model';
import { PuzzleHeroesService } from './puzzle-heroes.service';
import { PuzzleHeroesController } from './puzzle-heroes.controller';
import { QuestionsSchema } from '../questions/questions.model';
import { AttendeesSchema } from '../attendees/attendees.model';
import { TeamsSchema } from '../teams/teams.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "puzzle-heroes",
            schema: PuzzleHeroesSchema
        }]),
        MongooseModule.forFeature([{
            name: "questions",
            schema: QuestionsSchema
        }]),
        MongooseModule.forFeature([{
            name: "attendees",
            schema: AttendeesSchema
        }]),
        MongooseModule.forFeature([{
            name: 'teams',
            schema: TeamsSchema
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
