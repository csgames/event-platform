import * as mongoose from "mongoose";

export enum QuestionTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavender = "scavenger"
}

export enum ValidationTypes {
    String = "string",
    Regex = "regex",
    Function = "function"
}

export interface Questions extends mongoose.Document {
    label: string;
    description: { [lang: string]: string };
    type: QuestionTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
}

export const QuestionsSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    description: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        enum: ["crypto", "gaming", "scavenger"],
        required: true
    },
    validationType: {
        type: String,
        enum: ["string", "regex", "function"],
        required: true
    },
    answer: {
        type: Object,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});