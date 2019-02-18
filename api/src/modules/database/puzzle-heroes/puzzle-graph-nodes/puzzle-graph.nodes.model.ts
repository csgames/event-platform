import { Questions } from '../../questions/questions.model';
import * as mongoose from 'mongoose';

export interface PuzzleGraphNodes {
    question: (Questions | mongoose.Types.ObjectId | string);
    depends: (Questions | mongoose.Types.ObjectId | string);
}

export const PuzzleGraphNodesSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    depends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: false
    }
});
