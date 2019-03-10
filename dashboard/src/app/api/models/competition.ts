import { Activity } from "./activity";
import { Attendee } from "./attendee";
import { Event } from "./event";
export enum QuestionTypes {
    Crypto = "crypto",
    Gaming = "gaming",
    Scavender = "scavenger",
    Upload = "upload"
}

export enum ValidationTypes {
    String = "string",
    Regex = "regex",
    Function = "function"
}

export interface Competition {
    _id: string;
    activities: Activity[];
    directors: Attendee[];
    maxMembers: number;
    members: Members[];
    answers: QuestionAnswers;
    questions: QuestionGraphNodes[];
    password: string;
    isLive: boolean;
}

export interface Members {
    teamId: string;
    attendees: Attendee[];
}

export interface QuestionAnswers {
    puzzle: string;
    teamId: string;
    value: any;
    timestamp: Date | string;
}

export interface QuestionGraphNodes {
    _id: string;
    question: Question;
    dependsOn: Question;
}

export interface Question {
    label: string;
    description: { [lang: string]: string };
    type: QuestionTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
}
