import { IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';

export class QuestionAnswerDto {
    @IsNotEmpty()
    @ValidateIf(x => !x.upload)
    answer: string;

    @IsNotEmpty()
    @IsBoolean()
    @ValidateIf(x => !x.answer)
    upload: boolean;

    file: Express.Multer.File;
    teamId: string;
}
