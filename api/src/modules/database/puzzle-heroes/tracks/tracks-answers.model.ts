import { Questions } from '../../questions/questions.model';
import * as mongoose from "mongoose";
import { Teams } from '../../teams/teams.model';

export interface TracksAnswers extends mongoose.Document {
    question: Questions | mongoose.Types.ObjectId | string;
    teamId: Teams | mongoose.Types.ObjectId | string;
    timestamp: Date | string;
}

export const TracksAnswersSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});
