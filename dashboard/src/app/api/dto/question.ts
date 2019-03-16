import { InputTypes, QuestionTypes, ValidationTypes } from "../models/question";

export interface CreateQuestionDto {
    label: string;
    description: object;
    type: QuestionTypes;
    validationType: ValidationTypes;
    inputType: InputTypes;
    answer: any;
    score: number;
}

export interface UpdateQuestionDto {
    label: string;
    description: object;
    type: QuestionTypes;
    validationType: ValidationTypes;
    inputType: InputTypes;
    answer: any;
    score: number;
}
