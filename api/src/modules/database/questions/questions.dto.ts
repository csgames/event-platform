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
    @IsNotEmpty({
        always: true
    })
    label: string;

    @IsNotEmpty({
        always: true
    })
    description: object;

    @IsNotEmpty({
        always: true
    })
    @IsIn(["crypto", "gaming", "scavenger", "upload"])
    type: QuestionTypes;

    @IsNotEmpty()
    @IsIn(["upload"], {
        groups: ["upload"]
    })
    @IsIn(["string", "regex", "function"])
    validationType: ValidationTypes;

    @IsNotEmpty({
        always: true
    })
    @ValidateIf(x => x.type !== QuestionTypes.Upload, {
        always: true
    })
    answer: any;

    @IsNotEmpty({
        always: true
    })
    @IsNumber({}, {
        always: true
    })
    @ValidateIf(x => x.type !== QuestionTypes.Upload, {
        always: true
    })
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
