import { QuestionTypes, ValidationTypes } from './questions.model';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    description: object;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger", "upload"])
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
    @IsOptional()
    @IsNotEmpty()
    label: string;

    @IsOptional()
    @IsNotEmpty()
    description: object;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger", "upload"])
    type: QuestionTypes;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsOptional()
    @IsNotEmpty()
    answer: any;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    score: number;
}
