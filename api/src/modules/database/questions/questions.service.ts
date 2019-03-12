import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { Questions, ValidationTypes } from './questions.model';
import { UpdateQuestionDto } from './questions.dto';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>,
                private httpService: HttpService) {
    }

    public async updateQuestion(questionId: string, dto: UpdateQuestionDto): Promise<void> {
        const question = await this.questionsModel.findOne({_id: questionId }).exec();
        if(!question) {
            throw new NotFoundException('No question found');
        }

        await this.questionsModel.update({
            _id: questionId
        }, dto).exec();
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
            case ValidationTypes.Function:
                validationResult = await this.validateCustomFunction(answer, question.answer);
                if (!validationResult) {
                    throw new BadRequestException('Invalid answer');
                }
                break;
            default:
                throw new BadRequestException('Invalid validation type');
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

    public async validateCustomFunction(answer: string, url: string): Promise<boolean> {
        let jsonAnswer: object = null;
        try {
            jsonAnswer = JSON.parse(answer);
        } catch (e) {
            throw new BadRequestException('Custom function validation requires the answer to be a valid JSON object.');
        }

        if (jsonAnswer) {
            let response: AxiosResponse;
            try {
                response = await this.httpService.post(url, jsonAnswer, {
                    headers: {
                        Secret: process.env.PUZZLE_HERO_VALIDATION_SECRET
                    }
                }).toPromise();
            } catch (e) {
                throw new BadRequestException('Invalid answer');
            }

            if (!response) {
                throw new InternalServerErrorException('Custom validation endpoint does not respond.');
            }
            if (response.status !== 200) {
                throw new BadRequestException('Invalid answer');
            }
            return true;
        } else {
            throw new BadRequestException('Problem with JSON answer.');
        }
    }
}
