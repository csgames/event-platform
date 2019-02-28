import * as mongoose from "mongoose";
import { Teams } from '../../teams/teams.model';

export interface QuestionAnswers extends mongoose.Document {
    puzzle: mongoose.Types.ObjectId | string;
    teamId: Teams | mongoose.Types.ObjectId | string;
    timestamp: Date | string;
}

export const QuestionAnswersSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
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
