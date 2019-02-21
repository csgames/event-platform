import { IsNotEmpty } from 'class-validator';

export class PuzzleAnswerDto {
    @IsNotEmpty()
    answer: string;
}
