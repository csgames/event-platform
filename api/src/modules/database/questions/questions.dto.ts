import { QuestionTypes, ValidationTypes } from './questions.model';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateQuestionDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    description: object;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger"])
    type: QuestionTypes;

    @IsNotEmpty()
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsNotEmpty()
    answer: any;

    @IsNotEmpty()
    @IsNumber()
    score: number;
}

export class UpdateQuestionDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    description: object;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger"])
    type: QuestionTypes;

    @IsNotEmpty()
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsNotEmpty()
    answer: any;

    @IsNotEmpty()
    @IsNumber()
    score: number;
}
