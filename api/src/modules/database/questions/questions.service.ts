import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { InjectModel } from '@nestjs/mongoose';
import { StorageService } from '@polyhx/nest-services';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { QuestionAnswerDto } from './question-answer.dto';
import { Questions, QuestionTypes, ValidationTypes } from './questions.model';
import { UpdateQuestionDto } from './questions.dto';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>,
                private httpService: HttpService,
                private storageService: StorageService) {
    }

    public async updateQuestion(questionId: string, dto: UpdateQuestionDto): Promise<void> {
        const question = await this.questionsModel.findOne({_id: questionId}).exec();
        if (!question) {
            throw new NotFoundException('No question found');
        }

        await this.questionsModel.update({
            _id: questionId
        }, dto).exec();
    }

    public async validateAnswer(dto: QuestionAnswerDto, questionId: string): Promise<number> {
        const question = await this.questionsModel.findOne({
            _id: questionId
        }).exec();
        if (!question) {
            throw new NotFoundException('No question found');
        }

        let success: boolean;
        switch (question.validationType) {
            case ValidationTypes.String:
                success = this.validateString(dto.answer, question.answer);
                if (!success) {
                    throw new BadRequestException('Invalid answer');
                }
                break;
            case ValidationTypes.Regex:
                success = this.validateRegex(dto.answer, question.answer);
                if (!success) {
                    throw new BadRequestException('Invalid answer');
                }
                break;
            case ValidationTypes.Function:
                console.log("ben au moins on sait que cest un type de validation custom yknow");
                success = await this.validateCustomFunction(dto.answer, question.answer);
                if (!success) {
                    console.log("!success returned true in validate answer question service");
                    throw new BadRequestException('Invalid answer');
                }
                break;
            case ValidationTypes.None:
                break;
            default:
                throw new BadRequestException('Invalid validation type');
        }

        if (question.type === QuestionTypes.Upload) {
            success = await this.uploadFile(dto.file, question, dto.teamId);
            if (!success) {
                throw new BadRequestException('Upload failed');
            }
        }

        return question.score;
    }

    public async getUplodedFile(questionId: string): Promise<{ [name: string]: Buffer }> {
        const question = await this.questionsModel.findOne({
            _id: questionId
        }).exec();
        if (!question) {
            throw new NotFoundException('No question found');
        }
        if (question.type !== QuestionTypes.Upload) {
            throw new NotFoundException('Invalid question type');
        }

        return await this.storageService.getFilesFromDirectory(`questions/${question._id.toHexString()}`);
    }

    public validateString(userAnswer: string, answer: string): boolean {
        return userAnswer === answer;
    }

    public validateRegex(userAnswer: string, questionRegex: string): boolean {
        let regex = new RegExp(questionRegex);
        return regex.test(userAnswer);
    }

    public async validateCustomFunction(answer: string, url: string): Promise<boolean> {
        console.log("validate custom function method is called");
        let jsonAnswer = { answer : answer };
        
        if (jsonAnswer) {
            let response: AxiosResponse;
            try {
                console.log("trying to POST server with answer...");
                response = await this.httpService.post(url, jsonAnswer, {
                    headers: {
                        Secret: process.env.PUZZLE_HERO_VALIDATION_SECRET
                    }
                }).toPromise();
            } catch (e) {
                console.log("catch exception after post");
                console.log(e);
                throw new BadRequestException('Invalid answer');
            }

            if (!response) {
                console.log("!response returned true");
                throw new InternalServerErrorException('Custom validation endpoint does not respond.');
            }
            if (response.status !== 200) {
                console.log("response !== 200 returned true");
                console.log("status: " + response.status);
                throw new BadRequestException('Invalid answer');
            }
            return true;
        } else {
            console.log("jsonAnswer is empty wtf");
            throw new BadRequestException('Problem with JSON answer.');
        }
    }

    public async uploadFile(file: Express.Multer.File, question: Questions, teamId: string): Promise<boolean> {
        if (question.option && question.option.contentTypes &&
            !question.option.contentTypes.some(x => x.toLowerCase() === file.mimetype.toLowerCase())) {
            return false;
        }

        try {
            const ext = file.originalname.slice(file.originalname.indexOf("."), file.originalname.length);
            file.originalname = `${teamId}${ext}`;
            await this.storageService.upload(file, `questions/${question._id.toHexString()}`);
            return true;
        } catch (e) {
            return false;
        }
    }
}
