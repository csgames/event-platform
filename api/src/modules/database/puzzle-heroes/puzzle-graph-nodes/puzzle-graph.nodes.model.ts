import * as mongoose from "mongoose";
import { Questions } from "../../questions/questions.model";

export interface PuzzleGraphNodes extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    question: (Questions | mongoose.Types.ObjectId | string);
    dependsOn: (Questions | mongoose.Types.ObjectId | string);
}

export const PuzzleGraphNodesSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true
    },
    dependsOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: false
    }
});
