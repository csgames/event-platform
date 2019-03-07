import { ValidationTypes, PuzzleTypes } from "../models/puzzle-hero";

export interface CreateQuestionDto {
    label: string;
    description: object;
    type: PuzzleTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
}

export interface UpdateQuestionDto {
    label: string;
    description: object;
    type: PuzzleTypes;
    validationType: ValidationTypes;
    answer: any;
    score: number;
}