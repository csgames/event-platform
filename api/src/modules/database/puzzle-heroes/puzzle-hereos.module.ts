import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PuzzleHeroesSchema } from './puzzle-heroes.model';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: "puzzleHeroes",
            schema: PuzzleHeroesSchema
        }])
    ],
    providers: [
    ]
})
export class PuzzleHeroesModule {
}
