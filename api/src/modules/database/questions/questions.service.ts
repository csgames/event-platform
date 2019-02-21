import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, ValidationTypes } from './questions.model';
import { PuzzleHeroes } from '../puzzle-heroes/puzzle-heroes.model';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>,
                @InjectModel('puzzle-heroes') private readonly puzzleHeroesModel: Model<PuzzleHeroes>) {
    }

    private async getQuestionObject(eventId: string, puzzleId: string): Promise<Questions> {
        // mutex pour s'assurer que c'est pas tout le monde en meme temps
        let puzzleHero = await (this.puzzleHeroesModel.findOne({ event: eventId }).exec());

        for (let i = 0; i < puzzleHero.tracks.length; ++i) {
            for (let j = 0; j < puzzleHero.tracks[i].puzzles.length; ++j) {
                if(puzzleHero.tracks[i].puzzles[j]._id.toHexString() !== puzzleId) { continue; }
                
                let question = await (this.questionsModel.findOne(
                    { _id: puzzleHero.tracks[i].puzzles[j].question }).exec());
                return question;
            }
        }
        return null;
    }

    public async validateAnswer(answer: string, puzzleId: string, eventId: string) {
        let question = await this.getQuestionObject(eventId, puzzleId);
        if(!question) { return false; }

        switch (question.validationType) {
            case ValidationTypes.String:
                return this.validateString(answer, question.answer);
            default:
                return false;
        } 
    }

    public validateString(userAnswer: string, answer: string): boolean {
        return userAnswer === answer;
    }

    // public async validateRegex(answer: string, questionId: string): Promise<boolean> {
    //     let questionAnswer = await this.getAnswerObject(questionId);
    //     let regex = new RegExp(questionAnswer);
    //     return regex.test(answer);
    // }

    // public validateCustomFunction(): boolean {
    //     return null;
    // }
}
