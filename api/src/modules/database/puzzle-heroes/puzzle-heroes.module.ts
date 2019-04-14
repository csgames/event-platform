import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RedisModule } from "../../redis/redis.module";
import { AttendeesSchema } from "../attendees/attendees.model";
import { QuestionsSchema } from "../questions/questions.model";
import { QuestionsModule } from "../questions/questions.module";
import { SchoolsSchema } from "../schools/schools.model";
import { TeamsSchema } from "../teams/teams.model";
import { PuzzleHeroesController } from "./puzzle-heroes.controller";
import { PuzzleHeroesGateway } from "./puzzle-heroes.gateway";
import { PuzzleHeroesSchema } from "./puzzle-heroes.model";
import { PuzzleHeroesService } from "./puzzle-heroes.service";

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
            name: "teams",
            schema: TeamsSchema
        }]),
        MongooseModule.forFeature([{
            name: "schools",
            schema: SchoolsSchema
        }]),
        QuestionsModule,
        RedisModule
    ],
    controllers: [PuzzleHeroesController],
    providers: [
        PuzzleHeroesService,
        PuzzleHeroesGateway
    ],
    exports: [
        PuzzleHeroesService
    ]
})
export class PuzzleHeroesModule {
}
