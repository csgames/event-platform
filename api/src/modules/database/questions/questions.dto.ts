import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { QuestionTypes, ValidationTypes } from './questions.model';

export class QuestionOptionDto {
    @IsNotEmpty({
        groups: ["upload"]
    })
    @ArrayNotEmpty({
        groups: ["upload"]
    })
    contentTypes: string[];
}

export class CreateQuestionDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    description: object;

    @IsNotEmpty()
    @IsIn(["crypto", "gaming", "scavenger", "upload"])
    type: QuestionTypes;

    @IsNotEmpty()
    @IsIn(["upload"], {
        groups: ["upload"]
    })
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsNotEmpty()
    @ValidateIf(x => x.type !== "upload")
    answer: any;

    @IsNotEmpty()
    @IsNumber()
    @ValidateIf(x => x.type !== "upload")
    score: number;

    @IsNotEmpty({
        groups: ["upload"]
    })
    @ValidateNested({
        groups: ["upload"]
    })
    @Type(() => QuestionOptionDto)
    option: QuestionOptionDto;
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
    @IsIn(["upload"], {
        groups: ["upload"]
    })
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsOptional()
    @IsNotEmpty()
    answer: any;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsOptional()
    @ValidateNested({
        groups: ["upload"]
    })
    option: QuestionOptionDto;
}
