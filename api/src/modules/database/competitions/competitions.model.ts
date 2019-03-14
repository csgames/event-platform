import * as mongoose from 'mongoose';
import { Activities, ActivitiesUtils } from '../activities/activities.model';
import { Attendees } from '../attendees/attendees.model';
import { Events } from '../events/events.model';
import { Members, MembersSchema } from './members/members.model';
import { QuestionAnswers, QuestionAnswersSchema } from './questions/question-answers.model';
import { QuestionGraphNodes, QuestionGraphNodesSchema } from './questions/question-graph-nodes.model';
import { DateUtils } from '../../../utils/date.utils';
import { PuzzleHeroes } from '../puzzle-heroes/puzzle-heroes.model';

export interface Competitions extends mongoose.Document {
    event: Events | mongoose.Types.ObjectId | string;
    activities: (Activities | mongoose.Types.ObjectId | string)[];
    directors: (Attendees | mongoose.Types.ObjectId | string)[];
    questions: QuestionGraphNodes[];
    answers: QuestionAnswers[];
    members: Members[];
    description: { [lang: string]: string };
    maxMembers: number;
    password: string;
    isLive: boolean;
    onDashboard: boolean;
}

export const CompetitionsSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'activities',
        required: true
    },
    directors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'attendees',
        default: []
    },
    questions: {
        type: [QuestionGraphNodesSchema],
        default: []
    },
    answers: {
        type: [QuestionAnswersSchema],
        default: []
    },
    members: {
        type: [MembersSchema],
        default: []
    },
    description: {
        type: Object,
        required: true
    },
    maxMembers: {
        type: Number,
        default: 2,
        required: true
    },
    password: {
        type: String
    },
    isLive: {
        type: Boolean,
        default: false
    },
    onDashboard: {
        type: Boolean,
        default: true
    }
});

export class CompetitionsUtils {

    public static isLive(competition: Competitions): boolean {
        return CompetitionsUtils.isStarted(competition) && !CompetitionsUtils.isEnded(competition);
    }

    public static isStarted(competition: Competitions): boolean {
        return ActivitiesUtils.isStarted(competition.activities as Activities[]) && competition.isLive;
    }

    public static isEnded(competition: Competitions): boolean {
        return ActivitiesUtils.isEnded(competition.activities as Activities[]) && !competition.isLive;
    }
}
