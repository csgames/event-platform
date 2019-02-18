import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PuzzleHeroesSchema } from './puzzle-heroes.model';
import { PuzzleController } from './puzzle-heroes.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "puzzleHeroes",
            schema: PuzzleHeroesSchema
        }])
    ],
    controllers: [
        PuzzleController
    ],
    providers: [
    ]
})
export class PuzzleHeroesModule {
}
