import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questions, ValidationTypes } from './questions.model';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>) {
    }

    public async validateAnswer(answer: string, questionId: string): Promise<number> {
        const question = await this.questionsModel.findOne({
            _id: questionId
        }).exec();
        if (!question) {
            throw new NotFoundException('No question found');
        }

        let validationResult: boolean;
        switch (question.validationType) {
            case ValidationTypes.String:
                validationResult = this.validateString(answer, question.answer);
                if (!validationResult) {
                    throw new BadRequestException('Invalid answer');
                }
                break;
            case ValidationTypes.Regex:
                validationResult = this.validateRegex(answer, question.answer);
                if (!validationResult) {
                    throw new BadRequestException('Invalid answer');
                }
                break;
            default:
                throw new BadRequestException("Invalid validation type");
        }

        return question.score;
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
