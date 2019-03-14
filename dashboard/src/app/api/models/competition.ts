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

export enum InputTypes {
    String = "string",
    Upload = "upload",
    Code = "code"
}

export interface Competition {
    _id: string;
    activities: Activity[];
    directors: Attendee[];
    maxMembers: number;
    members: Members[];
    answers: QuestionAnswers;
    questions: Question[];
    password: string;
    isLive: boolean;
    onDashboard: boolean;
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

export interface Question {
    _id: string;
    label: string;
    description: { [lang: string]: string };
    type: QuestionTypes;
    inputType: InputTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
    isAnswered?: boolean;
    isLocked?: boolean;
}
