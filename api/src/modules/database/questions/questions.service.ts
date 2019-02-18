import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { CreateEventDto } from '../events/events.dto';
import { Events } from '../events/events.model';
import { Questions } from './questions.model';

@Injectable()
export class QuestionsService extends BaseService<Events, CreateEventDto> {
    constructor(@InjectModel('questions') private readonly questionsModel: Model<Questions>,
                @InjectModel('events') private readonly eventsModel: Model<Events>) {
        super(eventsModel);
    }

    private getAnswer(questionId: string) {
        return null;
    }

    public validateString(answer: string, questionId: string, ignoreCase = false): boolean {
        let questionAnswer = this.getAnswer(questionId);

        let regex: RegExp;
        if (ignoreCase) {
            regex = new RegExp('^' + questionAnswer + '$', 'i');
        } else {
            regex = new RegExp('^' + questionAnswer + '$');
        }
        return regex.test(answer);
    }

    public validateRegex(answer: string, questionId: string): boolean {
        let questionAnswer = this.getAnswer(questionId);
        let regex = new RegExp(questionAnswer);
        return regex.test(answer);
    }

    public validateCustomFunction(): boolean {
        return null;
    }
}
