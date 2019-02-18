import { QuestionTypes, ValidationTypes } from './questions.model';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    description: string;

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
