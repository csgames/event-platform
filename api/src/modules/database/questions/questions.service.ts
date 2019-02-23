import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, ValidationTypes } from './questions.model';
import { PuzzleHeroes } from '../puzzle-heroes/puzzle-heroes.model';
import { Attendees } from '../attendees/attendees.model';
import { Teams } from '../teams/teams.model';
import { TracksAnswers } from '../puzzle-heroes/tracks/tracks-answers.model';
import { PuzzleHeroesService } from '../puzzle-heroes/puzzle-heroes.service';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>,
                @InjectModel('puzzle-heroes') private readonly puzzleHeroesModel: Model<PuzzleHeroes>,
                @InjectModel('attendees') private readonly attendeesModel: Model<Attendees>,
                @InjectModel('teams') private readonly teamsModel: Model<Teams>,
                private puzzleHeroService: PuzzleHeroesService) {
    }

    private async getQuestionObject(eventId: string, puzzleId: string, puzzleHero: PuzzleHeroes): Promise<Questions> {
        for (const track of puzzleHero.tracks) {
            const puzzle = track.puzzles.find((p) => p._id.toHexString() === puzzleId);
            if (!puzzle) {
                return null;
            }

            return await this.questionsModel.findOne({
                _id: puzzle.question
            }).exec();
        }
        return null;
    }

    public async validateAnswer(answer: string, puzzleId: string, eventId: string, email: string): Promise<void> {
        // mutex pour s'assurer que c'est pas tout le monde en meme temps
        const puzzleHero = await this.puzzleHeroesModel.findOne({ event: eventId }).exec();
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        let question = await this.getQuestionObject(eventId, puzzleId, puzzleHero);
        if(!question) {
            throw new NotFoundException('No question found');
        }

        const attendee = await this.attendeesModel.findOne({
            email
        }).select('_id').exec();

        const team = await this.teamsModel.findOne({
            attendees: attendee ? attendee._id : null,
            event: eventId
        }).select('_id').exec();
        const teamId = team ? team._id.toHexString() : null;
        let validationResult: boolean;

        switch (question.validationType) {
            case ValidationTypes.String:
                validationResult = this.validateString(answer, question.answer);
                if (!validationResult) {
                    throw new BadRequestException('Invalid answer');
                }
            case ValidationTypes.Regex:
                validationResult = this.validateRegex(answer, question.answer);
                if (!validationResult) {
                    throw new BadRequestException('Invalid answer');
                }
        }
        
        const now = new Date();
        var utc_timestamp = new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(), 
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
        puzzleHero.answers.push({
            question,
            teamId,
            timestamp: utc_timestamp
        } as TracksAnswers);
        this.puzzleHeroService.addTeamScore(eventId, teamId, question.score);
    }

    public validateString(userAnswer: string, answer: string): boolean {
        return userAnswer === answer;
    }

    public validateRegex(userAnswer: string, questionRegex: string): boolean {
        let regex = new RegExp(questionRegex);
        return regex.test(userAnswer);
    }

    // public validateCustomFunction(): boolean {
    //     return null;
    // }
}
