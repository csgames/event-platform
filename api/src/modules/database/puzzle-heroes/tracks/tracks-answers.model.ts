import { Questions } from '../../questions/questions.model';
import * as mongoose from "mongoose";
import { Teams } from '../../teams/teams.model';

export interface TracksAnswers {
    questionId: Questions | mongoose.Types.ObjectId | string;
    teamId: Teams | mongoose.Types.ObjectId | string;
    timestamp: Date | string;
}
